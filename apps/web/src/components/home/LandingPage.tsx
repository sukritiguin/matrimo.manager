import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { ArrowRight, Calendar, Edit3, Share2 } from "lucide-react";

export const LandingPage = () => {
  return (
    <div className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 min-h-[calc(100svh-3rem)]">
        <div className="container w-full px-4 md:px-16">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create Stunning Event Invitations
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Design beautiful invitations for any occasion with our
                    easy-to-use editor. Choose from hundreds of templates or
                    create your own from scratch.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {/* TODO: Replace with Link */}
                  <Link to=".">
                    <Button size="lg" className="gap-1">
                      Start Designing <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  {/* TODO: Replace with Link */}
                  <Link to=".">
                    <Button size="lg" variant="outline">
                      Browse Templates
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=550&width=750"
                  alt="Editor Preview"
                  className="rounded-lg w-full aspect-video object-cover border shadow-lg"
                />
              </div>
            </div>
        </div>
      </section>

      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 min-h-[calc(100svh-3rem)]"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Everything you need to create professional event invitations and
                manage your events
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary p-3">
                <Edit3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Intuitive Editor</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Drag-and-drop interface with powerful editing tools to customize
                every aspect of your invitation
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary p-3">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Event Templates</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Hundreds of professionally designed templates for weddings,
                birthdays, corporate events, and more
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary p-3">
                <Share2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Easy Sharing</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Export your designs in multiple formats and share directly to
                social media, email, or messaging apps
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="templates" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Templates
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Browse our collection of professionally designed templates for
                any occasion
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Wedding",
                image: "/placeholder.svg?height=400&width=300",
              },
              {
                title: "Birthday",
                image: "/placeholder.svg?height=400&width=300",
              },
              {
                title: "Corporate",
                image: "/placeholder.svg?height=400&width=300",
              },
              {
                title: "Baby Shower",
                image: "/placeholder.svg?height=400&width=300",
              },
              {
                title: "Graduation",
                image: "/placeholder.svg?height=400&width=300",
              },
              {
                title: "Holiday",
                image: "/placeholder.svg?height=400&width=300",
              },
            ].map((template, index) => (
              <Link to="." key={index} className="group">
                <div className="overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={`${template.title} Template`}
                    width={300}
                    height={400}
                    className="aspect-[3/4] object-cover w-full transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{template.title}</h3>
                    <p className="text-sm text-gray-500">
                      Multiple designs available
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link to=".">
              <Button size="lg" variant="outline">
                View All Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
