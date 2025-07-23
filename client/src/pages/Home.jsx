import { Link } from "react-router-dom"
import { ShoppingBag, Truck, Shield, Headphones } from "lucide-react"
import Particles from "../animations/Particles"

const Home = () => {
  return (
    <div className="space-y-8">
      <section className="text-center py-10 rounded-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Curators Shop
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Shop from the comfort of your home with our secure and
            user-friendly e-commerce platform.
          </p>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-primary-600 text-white rounded-2xl py-16 px-8 text-center relative overflow-hidden">
  <div className="absolute inset-0 z-0">
    <Particles  moveParticlesOnHover={true}/>
  </div>

  <div className="relative z-10">
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
