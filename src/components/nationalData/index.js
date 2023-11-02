const nationalData = props => {
    const {confirmedCases,activeCases,recoveredCases,deceasedCases}=props
    return(
 <div className="stats-container">
          <div className="cardconfirm">
            <p>Confirmed</p>
            <img
              src="https://res.cloudinary.com/dgahf1oml/image/upload/v1698401422/check-mark_1_djvado.png"
              alt="country wide confirmed cases pic"
              className="img"
            />
            <p>{confirmedCases}</p>
          </div>
          <div className="cardactive">
            <p

            // testid="countryWideActiveCases"
            >
              Active
            </p>
            <img
              src="https://res.cloudinary.com/dgahf1oml/image/upload/v1698401347/protection_1_gxcas9.png"
              alt="country wide active cases pic"
              className="img"
            />
            <p>{activeCases}</p>
          </div>
          <div className="cardRecovered">
            <p

            // testid="countryWideRecoveredCases"
            >
              Recovered
            </p>
            <img
              src="https://res.cloudinary.com/dgahf1oml/image/upload/v1698401115/recovered_1_zik7os.png"
              alt="country wide recovered cases pic"
              className="img"
            />
            <p>{recoveredCases}</p>
          </div>
          <div className="cardDeceased">
            <p

            // testid="countryWideDeceasedCases"
            >
              Deceased
            </p>
            <img
              src="https://res.cloudinary.com/dgahf1oml/image/upload/v1698401274/breathing_1_1_wfkllh.png"
              alt="country wide deceased cases pic"
              className="img"
            />
            <p>{deceasedCases}</p>
          </div>
        
        <div>
    )
}
