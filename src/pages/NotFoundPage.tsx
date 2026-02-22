import { Title } from "@/components/shared/Title";
import { Subtitle } from "@/components/shared/Subtitle";
import { Button } from "@/components/shared/Button";
import { Planet } from "@/components/shared/Planet";
import { useNavigate } from "react-router-dom";
import GalaxyScene from "@/features/galaxy/Galaxy";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0">
        <GalaxyScene />
      </div>

      <div className="absolute top-20 left-20">
        <Planet fromColor="#8B5CF6" toColor="#A78BFA" size={20} />
      </div>
      <div className="absolute bottom-32 right-24">
        <Planet fromColor="#EC4899" toColor="#F472B6" size={24} />
      </div>
      <div className="absolute top-1/3 right-1/4">
        <Planet fromColor="#4DA3FF" toColor="#22D3EE" size={16} />
      </div>

      <div className="relative z-10 text-center w-full max-w-3xl px-5 md:px-8 lg:px-12 py-8">
        <div className="mb-8">
          <h1
            className="text-9xl font-bold text-transparent bg-clip-text mb-4"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              background: "linear-gradient(140deg, #4DA3FF, #8B5CF6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </h1>
        </div>

        <Title size="lg">Lost in Space</Title>
        <Subtitle>
          The page you're looking for has drifted into the void. Let's get you
          back on track.
        </Subtitle>

        <div className="flex gap-4 justify-center mt-8">
          <Button onClick={() => navigate(-1)} variant="secondary" size="md">
            Go Back
          </Button>
          <Button onClick={() => navigate("/")} variant="primary" size="md">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};
