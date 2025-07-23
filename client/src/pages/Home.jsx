import { Link } from "react-router-dom"
import { ShoppingBag, Truck, Shield, Headphones } from "lucide-react"

const Home = () => {
  const features = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-primary-600" />,
      title: "Wide Selection",
      description: "Thousands of products across multiple categories",
    },
    {
      icon: <Truck className="w-8 h-8 text-primary-600" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your doorstep",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: "Secure Payment",
      description: "Safe and secure payment processing",
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary-600" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support",
    },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-primary-600">ShopEasy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Shop from the comfort of your home with our secure and
            user-friendly e-commerce platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary text-lg px-8 py-3">
              Shop Now
            </Link>
            <Link to="/register" className="btn-secondary text-lg px-8 py-3">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose ShopEasy?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide the best shopping experience with quality products and excellent service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 card hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white rounded-2xl py-16 px-8 text-center">
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
      </section>
    </div>
  )
}

export default Home
