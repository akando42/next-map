import {Component} from 'react'
import Link from 'next/link'
import Styles from "./logo.module.css"

export default class Logo extends Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){

	}

	render(){
		return (
			<Link href="/">
				<div 
		            className={Styles.logo}
		            style={{
		              backgroundColor: `white`,
		              backgroundSize: `cover`,
		              backgroundImage: `url(logo/version1.png)`
		            }}
		            >
	          	</div>
	        </Link>
		)
	}
}