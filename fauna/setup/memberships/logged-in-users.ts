import { CreateOrUpdateRole, Executor } from '../utils'
import {
  Collection,
  CurrentIdentity,
  Equals,
  Get,
  Lambda,
  Let,
  Query,
  Select,
  Var,
} from 'faunadb'

export const setupLoggedInUsers = async (exec: Executor) => {
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
