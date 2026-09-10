import Image from 'next/image';

export default function MovieCast({ cast }) {
  if (!cast || cast.length === 0) {
    return null;
  }

  const topCast = cast.slice(0, 10);

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Cast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {topCast.map((person) => {
          const profileUrl = person.profile_path 
            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
            : null;

          return (
            <div key={person.id} className="bg-card-bg rounded-xl overflow-hidden transition-all duration-300 hover:bg-card-hover hover:-translate-y-0.5">
              {profileUrl ? (
                <Image
                  src={profileUrl}
                  alt={person.name}
                  width={185}
                  height={277}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-card-hover flex items-center justify-center text-text-secondary">
                  <span className="text-sm">No Photo</span>
                </div>
              )}
              <div className="p-3">
                <p className="font-semibold text-sm line-clamp-1">{person.name}</p>
                <p className="text-xs text-text-secondary line-clamp-1">{person.character}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}