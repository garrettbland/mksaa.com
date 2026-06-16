import { useState, useEffect } from "react";

interface Member {
  name: string;
  position: string;
  bio: string;
  email: string;
  image_url: string;
}

export default function ModalGallery({ data }: { data: Member[] }) {
  const [selected, setSelected] = useState(null);

  // ESC KEY HANDLER
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        setSelected(null);
      }
    }

    if (selected) {
      window.addEventListener("keydown", handleKey);
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [selected]);

  return (
    <>
      {/* GRID (unchanged) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((person, i) => (
          <div
            key={i}
            className="relative group cursor-pointer"
            onClick={() => setSelected(person)}
          >
            <img
              src={person.image_url}
              alt={person.name}
              className="w-full object-cover rounded-lg h-[270px]"
            />

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg">
              <p className="text-white text-lg font-semibold text-center px-2">
                {person.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelected(null)} // 👈 BACKDROP CLICK
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()} // 👈 PREVENT CLOSE WHEN CLICKING INSIDE
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
            >
              ×
            </button>

            <div className="grid md:grid-cols-2">
              <img
                src={selected.image_url}
                alt={selected.name}
                className="w-full h-full object-cover"
              />

              <div className="p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-brand-primary">
                  {selected.name}
                </h2>
                <p className="text-lg text-gray-700">{selected.position}</p>
                <p className="text-gray-600">{selected.bio}</p>

                <a
                  href={`mailto:${selected.email}`}
                  className="text-blue-600 underline mt-auto"
                >
                  {selected.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
