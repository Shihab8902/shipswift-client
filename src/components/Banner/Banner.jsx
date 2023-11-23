import bg from "../../assets/images/banner.jpg"

const Banner = () => {
    return <div className="hero min-h-screen bg-center bg-cover" style={{ backgroundImage: `url(${bg})` }}>
        <div className="hero-overlay bg-black bg-opacity-60"></div>
        <div className="hero-content text-center text-white">
            <div className="max-w-2xl">
                <h1 className="mb-5 text-3xl md:text-5xl font-bold uppercase md:leading-snug">We make strongest service above the world</h1>
                <div className="join w-full mt-6">
                    <input className="input w-full input-bordered join-item text-black" type="text" placeholder="Search..." />
                    <button className="btn join-item btn-success text-white ">Search</button>
                </div>
            </div>
        </div>
    </div>
}

export default Banner