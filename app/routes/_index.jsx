import HomePage from "../pages/web/HomePage";

export const meta = () => {
  return [
    { title: "Volunteer Central" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <HomePage />;
}
