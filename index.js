module.exports = {
	"page": function(page) {
		
		// This searches and matches against the following 
		//
		// /                                                        # Start of regex
		// (                                                        # Capture group 1
		//     https:\/\/[a-zA-Z0-9_\-\.]*\.cloudinary\.com\/       # https://anything.cloudinary.com/
		//     [a-zA-Z0-9_\-\/\.]*                                  # any/number/of/uri/path, without the character "\"
		// )
		// (                                                        # Capture group 2
		//	   \\\_                                                 # Match against "\_" specifically
		// )
		// /g                                                       # End of regex, matches globally
		//
		let matchingRegex = /(https:\/\/[a-zA-Z0-9_\-\.]*\.cloudinary\.com\/[a-zA-Z0-9_\-\/\.]*)(\\\_)/g;

		// This replacement str uses the above regex
		// Keeps capture group 1 content, while replacing "\_" with "_" respectively, finishing the fix
		let replacmentStr = "$1_"
		
		// Perform the replacement, before processing the page markdown
		page.content = page.content.replaceAll(matchingRegex, replacmentStr)
		return page;
	}
}