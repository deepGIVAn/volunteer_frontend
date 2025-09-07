import { redirect } from "@remix-run/react";
import AdminControlCentralPage from "../pages/admin/AdminControlCentralPage";
import { getSession } from "../utiils/sessions.server";
import { RoutesPath } from "../utiils/Path";

export async function loader({ request }) {
	const session = await getSession(request.headers.get("Cookie"));
	let user = session.get("user");
	if (user?.role != 1 ) {
		return redirect(RoutesPath.admin);
	}
	return Response.json({ });
}

export default function AdminControlCenter() {
	return <AdminControlCentralPage />
}
