import { LandingHero } from "../components/LandingHero"
import { LandingFooter } from "../components/LandingFooter"
import { NossoEspaco } from "../components/NossoEspaco";
import { Contato } from "../components/Contato";
function LandingPage(){
    return(
        <>
            <LandingHero/>
            <NossoEspaco />
            <Contato />
            <LandingFooter/>
        </>
    )
}




export { LandingPage };