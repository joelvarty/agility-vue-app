//Our Agility Modules
import RichTextArea from './components/modules/RichTextArea'
import PostsListing from './components/modules/PostListing'
import PostDetails from './components/modules/PostDetails'
import Jumbotron from './components/modules/Jumbotron'

//Our Agility PageTemplates
import OneColumnTemplate from './components/templates/OneColumnTemplate'

export default {
    guid: 'ade6cf3c', //Set your guid here
    fetchAPIKey: 'defaultlive.201ffdd0841cacad5bb647e76547e918b0c9ecdb8b5ddb3cf92e9a79b03623cb', //Set your fetch apikey here
    previewAPIKey: 'defaultpreview.adfe0723a62be2555845e0fdfab9d21d3fed6b85c2ae8f16c78343955f4f0aba', //set your preview apikey
    languageCode: 'en-us',
    channelName: 'website',
    isPreview: false,
    caching: {
        maxAge: 0
    },
    moduleComponents: {
        RichTextArea,
        PostsListing,
        Jumbotron,
        PostDetails
    },
    pageTemplateComponents: {
        OneColumnTemplate
    }
}