import getCookie from "@/app/actions/getCookies";
import RelationWrapper from "./RelationWrapper";

const page = ({ params }: { params: { slug: string } }) => {
	const cookie = getCookie()
	return <div>
		<RelationWrapper username={params.slug} token={cookie} />
	</div>
}

export default page;
