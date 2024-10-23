import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Users, Play } from "lucide-react"
import Link from "next/link"
import Appbar from "./components/Appbar"
import Redirect from "./components/Redirect"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
        <Appbar/>
        <Redirect/>
       <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-gray-900 to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-400">
                  Let Your Fans Choose the Beat
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Where creators and fans unite to create the perfect streaming soundtrack.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" variant="secondary" className="bg-purple-600 hover:bg-purple-700 text-white">
                    Get Started
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-purple-400">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-2 p-6 bg-gray-700 rounded-lg">
                <Users className="h-12 w-12 text-purple-400" />
                <h3 className="text-xl font-bold text-purple-400">Fan Engagement</h3>
                <p className="text-center text-gray-300">Boost interaction by letting fans pick the music.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-gray-700 rounded-lg">
                <Play className="h-12 w-12 text-purple-400" />
                <h3 className="text-xl font-bold text-purple-400">Live Voting</h3>
                <p className="text-center text-gray-300">Real-time song selection through audience votes.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-gray-700 rounded-lg">
                <Music className="h-12 w-12 text-purple-400" />
                <h3 className="text-xl font-bold text-purple-400">Creator Control</h3>
                <p className="text-center text-gray-300">Set playlists and control the voting pool.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="signup" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-purple-400">Ready to Revolutionize Your Streams?</h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                  Join FanTune today and start creating unforgettable music experiences with your audience.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" variant="secondary" className="bg-purple-600 hover:bg-purple-700 text-white">
                    Sign Up
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-500">© 2024 Mousikos. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs text-gray-500 hover:text-purple-400 transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs text-gray-500 hover:text-purple-400 transition-colors" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}