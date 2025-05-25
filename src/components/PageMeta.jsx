import * as React from "react";
// This component is used to dynamically set the page's title and meta description
const PageMeta = ({ title, description }) => {
	React.useEffect(() => {
		// Set the page title
		if (title) {
			document.title = title;
		}

		// Set or update the meta description tag
		if (description) {
			let descTag = document.querySelector('meta[name="description"]');
			if (!descTag) {
				// Create a new meta description tag if it doesn't exist
				descTag = document.createElement("meta");
				descTag.name = "description";
				document.head.appendChild(descTag);
			}
			// Update the content of the meta description tag
			descTag.content = description;
		}
	}, [description, title]); // Re-run effect when title or description changes
	return null; // This component does not render anything
};

export default PageMeta;
