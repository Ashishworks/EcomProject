import { Link } from "react-router-dom"
import { ShoppingBag, Truck, Shield, Headphones } from "lucide-react"
import Particles from "../animations/Particles"
import ShinyText from "../animations/ShinyText"
import CurvedLoop from "../animations/CurvedLoop"

const Home = () => {
  return (
    <div className="space-y-8">
      {/* CTA Section */}
      <section className="bg-primary-600 text-white rounded-2xl py-16 px-8 text-center relative overflow-hidden py-40">
        <div className="absolute inset-0 z-0">
          <Particles moveParticlesOnHover={true} />
        </div>

        <div className="relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <CurvedLoop marqueeText="Welcome ✦ to  ✦ Curators Shop ✦" speed={1}
              curveAmount={0}
              direction="right"
              interactive={true}></CurvedLoop>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto ">
              <ShinyText text="Discover amazing products at unbeatable prices. Shop from the comfort of your home with our secure and
            user-friendly e-commerce platform." disabled={false} speed={3} className='custom-class' />
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers and discover your next favorite product
          </p>
          <Link
            to="/products"
            className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
          >
            Browse Products
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home
