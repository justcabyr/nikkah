import DeckledCard from './DeckledCard.jsx'

const InvitationHero = ({ invitation }) => (
  <section className="hero" aria-label="Invitation">
    <div className="hero__stage">
      <div className="envelope" aria-hidden="true">
        <div className="envelope__body" />
        <div className="envelope__liner" />
        <div className="envelope__rim" />
      </div>
      <DeckledCard>
        <h1 className="card-copy__names">
          <span>{invitation.names[0]}</span>
          <span>{invitation.names[1]}</span>
        </h1>
        <p className="card-copy__invite">
          {invitation.invite.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <p className="card-copy__date">
          {invitation.dateScript.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <p className="card-copy__meta">
          {invitation.cardLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </DeckledCard>
    </div>
  </section>
)

export default InvitationHero
