export default function Overlay1Layout({ children }) {
  return (
    <div className="w-[1920px] h-[1080px] overflow-hidden bg-black">
      {children}
    </div>
  );
} 