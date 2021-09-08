import { CreateOrUpdateRole, Executor } from '../utils'
import {
  Collection,
  CreateCollection,
  CreateIndex,
  CurrentIdentity,
  Equals,
  Get,
  Lambda,
  Let,
  Query,
  Select,
  Var,
} from 'faunadb'

export const setupAccounts = async (exec: Executor) => {
  await exec(CreateCollection({ name: 'accounts' }), 'accounts collection')

  await exec(
    CreateIndex({
      name: 'all_accounts',
      source: Collection('accounts'),
      // this is the default collection index, no terms or values are provided
      // which means the index will sort by reference and return only the reference.
      serialized: true,
    }),
    'all_accounts index'
  )

  await exec(
    CreateIndex({
      name: 'accounts_by_email',
      source: Collection('accounts'),
      terms: [
        {
          field: ['data', 'email'], // We will search on email
        },
      ],
      unique: true, // Prevent that accounts with duplicate e-mails are made.
      serialized: true,
    }),
    'accounts_by_email index'
  )

  await exec(
    CreateOrUpdateRole({
      name: 'membershiprole_loggedin',
      membership: [{ resource: Collection('accounts') }], // default role for all these
      privileges: [
        // these are all the User Defined Functions
        // that a logged in user can call. All our manipulations
        // are encapsulated in User Defined Functions which makes it easier
        // to limit what data and how a user can adapt data.

        // {
        //   resource: q.Function('create_fweet'),
        //   actions: {
        //     call: true,
        //   },
        // },

        // ------ To search -------
        {
          resource: Collection('users'),
          actions: { read: true },
        },

        // ------To Update profiles -------
        // Updating profiles was deliberately done via roles as an example
        // But could just as well be placed in a UDF and rely on Identity()
        {
          // First we will get the users via the account so we need to be able
          // to get the account (which we will get via Identity())
          resource: Collection('accounts'),
          actions: {
            // A read privilege function receives the reference that is to be read!
            read: Query(Lambda('ref', Equals(CurrentIdentity(), Var('ref')))),
          },
        },
        {
          resource: Collection('users'),
          actions: {
            // Write only allows updates, not the creation of users.
            // When we insert a function in the write privilege we receive the actual objects
            // instead of the references. We receive both old as new data which we can use in the role to
            // validate whether the user is allowed to update it.
            write: Query(
              Lambda(
                ['oldData', 'newData', 'ref'],
                // If the reference we try to update is the same user
                // that belongs to the account that does this call, we let it through!
                Let(
                  {
                    // the reference of the user that tries to access
                    // (retrieved via the account ref that comes out of Identity())
                    loggedInUserRef: Select(
                      ['data', 'user'],
                      Get(CurrentIdentity())
                    ),
                  },
                  Equals(Var('loggedInUserRef'), Var('ref'))
                )
              )
            ),
          },
        },
      ],
    }),
    'membershiprole_loggedin role'
  )
}
