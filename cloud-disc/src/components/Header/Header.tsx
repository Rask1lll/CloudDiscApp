import Logo from "./Logo";
import LinkGenerate from "./LinkGenerate";
import QRGenerateBtn from "./QRGenerateBtn";

export default function Header() {
  return (
    <header className="w-full flex h-full justify-between">
      <div className="">
        <Logo />
      </div>
      <div className="flex static gap-5">
        <LinkGenerate />
        <QRGenerateBtn />
      </div>
    </header>
  );
}
