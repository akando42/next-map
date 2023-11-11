import path from 'path'
import {getAllPostIds} from '../libs/posts'

function generateSiteMap(posts) {
    return 
  	`
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		<!--We manually set the two URLs we know already-->
		<url>
			<loc>https://geogenetics.dystillvision.com</loc>
		</url>
		${posts
			.map(({ id }) => {
			return `
				<url>
				   <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
				</url>
			`;
			})
			.join('')
		}
		</urlset>
	`;
}

export default function SiteMap(){
}

export async function getServerSideProps({ res }) {
    const postsTopic = "public/content/posts"
    const postsDirectory = path.join(process.cwd(), postsTopic)
    
    const paths = getAllPostIds(postsDirectory)
    const fullPaths = paths.map(path => "https://geogenetics.dystillvision.com/"+path.params.id)
   
    let d = new Date()
    let hanoiZone = 'Asia/Bangkok'
    let hanoiTime = d.toISOString('en-GB', { timeZone: hanoiZone });

    let hanoiDate = hanoiTime.split("T")[0]
    console.log(hanoiDate)

    const sitemap = `
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			<url>
			  <loc>https://geogenetics.dystillvision.com/</loc>
			  <lastmod>2023-11-10</lastmod>
			</url>
			${
				fullPaths.map( fullPath => {
					return `
						<url>
							<loc>${fullPath}</loc>
							<lastmod>${hanoiDate}</lastmod>
						</url>
					`;
					}
				)
				.join('')
			}
		</urlset>
	`

	res.setHeader('Content-Type', 'text/xml');
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}
