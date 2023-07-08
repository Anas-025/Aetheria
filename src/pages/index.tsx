import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function Home() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          fontSize: "50px",
          fontWeight: "bold",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Home Page
        <a 
          href="/app"
          style={{
            color: "lightblue",
            fontSize: "30px",
            fontWeight: "normal",
            textDecoration: "underline",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          App<OpenInNewIcon />
        </a>
      </div>
    </>
  );
}
