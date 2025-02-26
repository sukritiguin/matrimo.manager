import { Card } from "@/components/ui/card";

export default function WeddingInvite() {
  return (
    <div className="flex justify-center items-center bg-[#fdf3e6] min-h-screen p-4">
      <Card className="w-full max-w-4xl p-6 border-2 border-yellow-500 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        <div className="md:w-2/5 text-center border-r-2 border-yellow-500 p-4">
          <h1 className="text-xl font-semibold text-yellow-600">
            With the Blessings of Lord Ganesha
          </h1>
          <div className="flex flex-col items-center gap-4 mt-4">
            <img
              src="https://png.pngtree.com/png-clipart/20231003/original/pngtree-lord-ganesha-png-image_13236682.png"
              alt="Lord Ganesha"
              width={250}
              height={250}
              className="rounded-lg"
            />
            <img
              src="https://i.pinimg.com/736x/fe/63/1b/fe631b227014751005277bb985f52e6a.jpg"
              alt="Bride and Groom"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="md:w-3/5 p-4 text-center">
          <p className="text-gray-700">
            We cordially invite you to celebrate the auspicious occasion of the
            marriage of
          </p>
          <h2 className="text-red-600 text-2xl font-semibold mt-2">
            Madhumika Chakraborty
          </h2>
          <p className="text-sm text-gray-500">
            (Daughter of Mr. Karun Chakraborty & Mrs. Madhuri Chakraborty)
          </p>
          <h2 className="text-2xl font-semibold mt-2">&</h2>
          <h2 className="text-red-600 text-2xl font-semibold mt-2">
            Pranay Gharui
          </h2>
          <p className="text-sm text-gray-500">
            (Son of Mr. Parimal Gharui & Mrs. Sarmila Gharui)
          </p>

          <div className="mt-4 border-t pt-4">
            <h3 className="text-red-600 font-semibold underline">
              Wedding Ceremony
            </h3>
            <p>
              <strong>Date:</strong> Saturday, November 9, 2025
            </p>
            <p>
              <strong>Time:</strong> 1:30 AM
            </p>
            <p>
              <strong>Venue:</strong> ITC Royal Bengal, Kolkata, 700127, West
              Bengal
            </p>
            <p className="text-gray-600 text-sm">
              Join us to bless the sacred union of the couple.
            </p>
          </div>

          <div className="mt-4 border-t pt-4">
            <h3 className="text-red-600 font-semibold underline">Reception</h3>
            <p>
              <strong>Date:</strong> Tuesday, November 11, 2025
            </p>
            <p>
              <strong>Time:</strong> 7:00 PM - 10:00 PM
            </p>
            <p>
              <strong>Venue:</strong> ITC Royal Bengal, Kolkata, 700127, West
              Bengal
            </p>
            <p className="text-gray-600 text-sm">
              Your gracious presence will add charm to the celebration.
            </p>
          </div>

          <div className="mt-6 text-gray-600 italic">
            Your presence will grace our occasion and bless the couple.
            <br />
            Warm regards,
            <br />
            <b>Mr. Karun Chakraborty</b>
          </div>
        </div>
      </Card>
    </div>
  );
}
