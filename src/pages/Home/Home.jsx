import Footer from "../../components/footer/Footer"
import Banner from "./Banner/Banner"
import Features from "./Features/Features"
import Nav from "./Nav/Nav"
import SiteStats from "./Site stats/SiteStats"
import TopDeliveryMan from "./Top delivery man/TopDeliveryMan"




const Home = () => {
    return <section>
        <Nav />
        <Banner />
        <Features />
        <SiteStats />
        <TopDeliveryMan />
        <Footer />

    </section>
}

export default Home