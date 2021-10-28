function CREATEREQUEST(bodyInfo) {
  
	const subdomain = 'YOUR_SUBDOMAIN_HERE'
  const url = 'https://${subdomain}.zendesk.com/api/v2/dynamic_content/items'
  const authInfo = PropertiesService.getDocumentProperties().getProperty('encodedInfo')

  const options = {
    'method': "post",
    'headers': { 'Authorization': `Basic ${authInfo}` },
    'contentType': 'application/json',
    'payload': bodyInfo
  }

  UrlFetchApp.fetch(url, options)
}

function CREATEDCITEM(defaultLang, secondaryLang, placeholder) {

  // *** Structure of the item to create ***
  const body = JSON.stringify (
    {
      item: {
        name: `${placeholder}`,
        default_locale_id: 1,
        variants: [
          {
            locale_id: 1,
            default: true,
            content: `${defaultLang}`
          },
          {
						locale_id: 1194,
						default: false,
						content: `${secondaryLang}`
          }
        ]
      }
    }
  )

  try {
    CREATEREQUEST(body)
    return "Success - DC Created"
  } catch(error) {
    return "Error - Something Went Wrong!"
  }
}

function FORMATTICKETFIELD(field) {
  const sheetName = SpreadsheetApp.getActiveSheet().getName()
  const placeholder = `${sheetName.split(' ').map( item => item.toLowerCase() ).join('-')}_${field.toUpperCase().split(' ').join('-')}`
  return placeholder
}

function SETPROPERTIES() {

	// Set your API key here
  // PropertiesService.getDocumentProperties().setProperties('encodedInfo', 'YOUR_API_KEY_HERE')

	// See your API key
  // Logger.log(PropertiesService.getDocumentProperties().getProperty('encodedInfo'))

}