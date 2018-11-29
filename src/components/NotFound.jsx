import React from 'react';
import './css/NotFound.css';

export default function NotFound() {
	return (
		<div class="notfound-container">
			<div className="message">
				<p>
					<strong>404</strong>
				</p>
				<p>The page you are looking for was not found!</p>
			</div>
		</div>
	);
}
