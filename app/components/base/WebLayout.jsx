import Footer from "./Footer";
import Header from "./Header";

export default function WebLayout({ children }) {
	return (
		<>
			<Header />
			<div className="pt-[88px]">{children}</div>
			<Footer />
		</>
	)
}
