module.exports = {
	hooks: {
		"page:before": function(page) {
			
			// This searches and matches against the following 
			//
			// /                                                                 # Start of regex
			// (                                                                 # Capture group 1
			//     https:\/\/[a-zA-Z0-9_\-\.]*\.cloudinary\.com\/                #   https://anything.cloudinary.com/
			//     [a-zA-Z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\%\=]*    #   all/valid/%uri/encoded/characters, without the character "\"
			// )
			// (                                                                 # Capture group 2
			//	   \\\_                                                          #   Match against "\_" specifically
			// )
			// /g                                                                # End of regex, matches globally
			//
			let matchingRegex = /(https:\/\/[a-zA-Z0-9_\-\.]*\.cloudinary\.com\/[a-zA-Z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\%\=]*)(\\\_)/g

			// This replacement str uses the above regex
			// Keeps capture group 1 content, while replacing "\_" with "_" respectively, finishing the fix
			let replacmentStr = "$1_"
			
			// Perform the replacement, before processing the page markdown, this can occur multiple times in a URL
			// hence the looping nature of replaceAll, which will loop on replacement, till no replacement can be found
			let newContent = page.content.replaceAll(matchingRegex, replacmentStr)
			while( newContent !== page.content ) {
				page.content = newContent;
				newContent = page.content.replaceAll(matchingRegex, replacmentStr);  
			}

			return page;
		}
	}
}