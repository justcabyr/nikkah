import invitation from './content.js'
import InvitationHero from './components/InvitationHero.jsx'
import EventDetails from './components/EventDetails.jsx'

const App = () => (
  <main>
    <InvitationHero invitation={invitation} />
    <EventDetails invitation={invitation} />
  </main>
)

export default App
