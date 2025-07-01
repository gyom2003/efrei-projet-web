type ProfilProps = {
  name: string;
  bio?: string;
  imageUrl?: string;
  email?: string;
};

export default function Profil({
  name,
  bio = "Aucune bio disponible",
  imageUrl = "https://via.placeholder.com/150", // image par défaut
  email,
}: ProfilProps) {
  return (
    <div
      style={{
        padding: 20,
        maxWidth: 300,
        textAlign: "center",
        fontFamily: "sans-serif",
        backgroundColor: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={imageUrl}
        alt="Photo de profil"
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: 16,
        }}
      />
      <h2 style={{ margin: "0 0 8px", fontSize: 20 }}>{name}</h2>
      <p style={{ color: "#666", fontStyle: "italic", marginBottom: 8 }}>
        {bio}
      </p>
      {email && (
        <p style={{ fontSize: 14, color: "#333" }}>
          <strong>Email:</strong> {email}
        </p>
      )}
    </div>
  );
}
