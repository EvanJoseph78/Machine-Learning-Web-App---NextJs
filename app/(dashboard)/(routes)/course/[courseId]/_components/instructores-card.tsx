
interface InstructorCardProps {
  instructorName: string,
  formation1: string | null,
  formation2?: string | null,
  profilePictureUrl: string | null
}

export const InstructorCard = ({ instructorName, formation1, formation2, profilePictureUrl }: InstructorCardProps) => {
  return (
    <div className="flex flex-col justify-start w-[320px] items-center gap-1">
      <div className="rounded-full overflow-hidden w-40 h-40">
        {profilePictureUrl && (
          <img src={profilePictureUrl} alt="Imagem Perfil" />
        )}
      </div>

      <p className="text-2xl text-vermelho-vinho">{instructorName}</p>

      <div className="flex flex-col items-center">
        <p>{formation1}</p>

        {formation2 && (
          <p>{formation2}</p>
        )}
      </div>

    </div>
  );
};
