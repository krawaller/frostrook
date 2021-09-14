import { QueryManager } from '../fauna/api/query-manager'

const QM = new QueryManager(
  process.env.FAUNA_ANON_KEY,
  process.env.FAUNA_DOMAIN
)

;(async () => {
  try {
    //const l = await QM.register('david@krawaller.se', 'gnurpgnurp', 'Tuff vid')
    const l = await QM.login('david@krawaller.se', 'gnurpgnurp')
    console.log('RESULT', l)
  } catch (err) {
    console.log('ERROR', err)
  }
})()
