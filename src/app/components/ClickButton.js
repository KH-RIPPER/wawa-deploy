const ClickButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "20px",
        fontSize: "24px",
        cursor: "pointer",
        backgroundColor: "#f0c040",
        border: "none",
        borderRadius: "10px",
      }}
    >
      Click Me!
    </button>
  );
};

export default ClickButton;
