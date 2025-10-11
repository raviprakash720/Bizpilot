import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Owner, Kumar Electronics",
    content: "BizPilot saved me 5+ hours every week. Invoice scanning is incredibly accurate and the reminders help me never miss a payment.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Director, Sharma Textiles",
    content: "Finally, accounting software that's actually easy to use! No technical skills needed and the AI assistant answers all my GST queries.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "Founder, Patel Trading Co.",
    content: "The automated vendor follow-ups feature is a game-changer. My cash flow improved significantly within the first month.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by MSME Owners
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our customers have to say
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-3xl hover-lift"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-card flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
