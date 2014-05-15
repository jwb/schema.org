//NOTE: this module has to be written so that it can be used from within CouchDb...

var isUrl = require('is-url')
  , semver = require('semver')
  , url = require('url');

var BASE = "https://registry.standardanalytics.io/";
var URL = 'https://registry.standardanalytics.io/package.jsonld';

exports.BASE = BASE;
exports.contextUrl = URL;
exports.link = '<' + URL + '>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"';

exports.terms = {
  "@context": {
    "pkg": "http://standardanalytics.io/package/",
    "schema": "http://schema.org/",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "oa": "http://www.w3.org/ns/oa#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "vs": "http://www.w3.org/2003/06/sw-vocab-status/ns#",
    "defines": {
      "@reverse": "rdfs:isDefinedBy"
    },
    "comment": "rdfs:comment",
    "label": "rdfs:label",
    "domain": {
      "@id": "rdfs:domain",
      "@type": "@id"
    },
    "range": {
      "@id": "rdfs:range",
      "@type": "@id"
    },
    "subClassOf": {
      "@id": "rdfs:subClassOf",
      "@type": "@id",
      "@container": "@set"
    },
    "subPropertyOf": {
      "@id": "rdfs:subPropertyOf",
      "@type": "@id",
      "@container": "@set"
    },
    "seeAlso": {
      "@id": "rdfs:seeAlso",
      "@type": "@id"
    },
    "status": "vs:term_status"
  },
  "@id": "http://standardanalytics.io/package",
  "defines": [

    {
      "@id": "pkg:dataset",
      "@type": "rdf:Property",
      "label": "dataset",
      "comment":"List of dataset",
      "range": "schema:Dataset",
      "domain": "pkg:Package",
      "status": "testing",
      "seeAlso": "http://schema.org/Dataset"
    },
    {
      "@id": "pkg:code",
      "@type": "rdf:Property",
      "label": "code",
      "comment":"List of code resources used for analytics or views",
      "range": "schema:Code",
      "domain": "pkg:Package",
      "status": "testing",
      "seeAlso": "http://schema.org/Code"
    },
    {
      "@id": "pkg:figure",
      "@type": "rdf:Property",
      "label": "figure",
      "comment":"List of figures",
      "range": "schema:ImageObject",
      "domain": "pkg:Package",
      "status": "testing",
      "seeAlso": "http://schema.org/ImageObject"
    },
    {
      "@id": "pkg:article",
      "@type": "rdf:Property",
      "label": "article",
      "comment":"List of articles",
      "range": "schema:Article",
      "domain": "pkg:Package",
      "status": "testing",
      "seeAlso": "http://schema.org/Article"
    },
    {
      "@id": "pkg:annotation",
      "@type": "rdf:Property",
      "label": "annotation",
      "comment":"List of annotations following open annotation",
      "range": "oa:Annotation",
      "domain": "pkg:Package",
      "status": "testing",
      "seeAlso": "http://www.w3.org/ns/oa"
    },

    {
      "@id": "pkg:registry",
      "@type": "rdf:Property",
      "label": "registry",
      "comment":"registry hosting resource of type Package",
      "range": "schema:Thing",
      "domain": "pkg:Package",
      "status": "testing",
      "seeAlso": "http://en.wikipedia.org/wiki/Metadata_registry"
    },

    {
      "@id": "pkg:package",
      "@type": "rdf:Property",
      "label": "package",
      "comment":"package hosting the resource",
      "range": "schema:Thing",
      "domain": "schema:CreativeWork",
      "status": "testing",
      "seeAlso": "http://www.schema.org/catalog"
    },

    {
      "@id": "pkg:input",
      "@type": "rdf:Property",
      "label": "input",
      "comment":"List of absolute or relative URLs of data resources used in a given analysis.",
      "range": "xsd:string",
      "domain": "schema:SoftwareApplication",
      "status": "testing",
      "seeAlso": "http://schema.org/SoftwareApplication"
    },
    {
      "@id": "pkg:filePath",
      "@type": "rdf:Property",
      "comment":"Unix-style ('/') path to a runnable file (typically a script) or binary. The path must be relative to the directory in which the Package containing this resource resides.",
      "label": "file path",
      "range": "xsd:string",
      "domain": "schema:SoftwareApplication",
      "status": "testing",
      "seeAlso": "http://dataprotocols.org/data-packages/#resource-information"
    },
    {
      "@id": "pkg:contentData",
      "@type": "rdf:Property",
      "comment":"Inline data content of a package dataset.",
      "label": "content data",
      "range": "xsd:string",
      "domain": "schema:DataDownload",
      "status": "testing",
      "seeAlso": "http://dataprotocols.org/data-packages/#resource-information"
    },
    {
      "@id": "pkg:contentPath",
      "@type": "rdf:Property",
      "comment":"Unix-style ('/') path to the data content of a package dataset. The path must be relative to the directory in which the Package containing this resource resides.",
      "label": "content path",
      "range": "xsd:string",
      "domain": "schema:MediaObject",
      "status": "testing",
      "seeAlso": "http://dataprotocols.org/data-packages/#resource-information"
    },

    {
      "@id": "pkg:valueType",
      "@type": "rdf:Property",
      "label": "value type",
      "comment":"The type (typicaly xsd) of a value",
      "range": "xsd:string",
      "domain": "schema:Thing",
      "status": "testing",
      "seeAlso": "http://www.w3.org/2001/XMLSchema"
    },

    {
      "@id": "pkg:Package",
      "@type": "rdfs:Class",
      "label": "Package",
      "comment": "A collection of resources associated with structured metadata describing their content and relationships", //TODO improve definition
      "seeAlso": "http://schema.org/DataCatalog",
      "subClassOf": [
        "schema:CreativeWork"
      ],
      "status": "testing"
    },

    {
      "@id": "pkg:Prior",
      "@type": "rdfs:Class",
      "label": "Statistical Prior",
      "comment": "A body of structured information describing a statistical prior",
      "seeAlso": "http://en.wikipedia.org/wiki/Prior",
      "subClassOf": [
        "schema:Dataset"
      ],
      "status": "testing"
    },

    {
      "@id": "pkg:Analytics",
      "@type": "rdfs:Class",
      "label": "Analytics",
      "comment": "A body of structured information describing the discovery of meaningful patterns in data",
      "seeAlso": "http://en.wikipedia.org/wiki/Analytics",
      "subClassOf": [
        "schema:Dataset"
      ],
      "status": "testing"
    },

    {
      "@id": "pkg:EmpiricalDataset",
      "@type": "rdfs:Class",
      "label": "empirical data",
      "comment": "Data acquired by means of observation or experimentation.",
      "seeAlso": "http://en.wikipedia.org/wiki/Empirical_evidence",
      "subClassOf": [
        "schema:Dataset"
      ],
      "status": "testing"
    },

    {
      "@id": "pkg:SimulatedDataset",
      "@type": "rdfs:Class",
      "label": "simulated data",
      "comment": "Data acquired by means of computer simulation",
      "seeAlso": "http://en.wikipedia.org/wiki/Computer_simulation",
      "subClassOf": [
        "schema:Dataset"
      ],
      "status": "testing"
    },

    {
      "@id": "pkg:Configuration",
      "@type": "rdfs:Class",
      "label": "Configuration file",
      "comment": "Configuration file configure the initial settings for some computer programs",
      "seeAlso": "http://en.wikipedia.org/wiki/Configuration_file",
      "subClassOf": [
        "schema:Dataset"
      ],
      "status": "testing"
    },

    {
      "@id": "pkg:TypesettingApplication",
      "@type": "rdfs:Class",
      "label": "Typeseting application",
      "comment": "A typesetting application (e.g latex) or full compile ready solution (bundle of latex, bibtex and style files)",
      "seeAlso": "http://en.wikipedia.org/wiki/Typesetting",
      "subClassOf": [
        "schema:SoftwareApplication"
      ],
      "status": "testing"
    }

  ],
  "@type": "owl:Ontology",
  "comment": "A lightweight vocabulary for terms of the data package spec",
  "label": "The data package Vocabulary"
};


exports.context = {
  "@context": {
    "@base": BASE,

    "pkg": "http://standardanalytics.io/package/",
    "sch":  "http://schema.org/",
    "nfo":  "http://www.semanticdesktop.org/ontologies/nfo/#",
    "dc":   "http://purl.org/dc/terms/",
    "dctypes": "http://purl.org/dc/dcmitype/",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "bibo": "http://purl.org/ontology/bibo/",
    "cnt": "http://www.w3.org/2011/content#",
    "oa": "http://www.w3.org/ns/oa#",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",

    "Package":  { "@id": "pkg:Package", "@type": "@id" },
    "Prior":  { "@id": "pkg:Prior", "@type": "@id" },
    "Analytics":  { "@id": "pkg:Analytics", "@type": "@id" },
    "EmpiricalDataset":  { "@id": "pkg:EmpiricalDataset", "@type": "@id" },
    "SimulatedDataset":  { "@id": "pkg:SimulatedDataset", "@type": "@id" },
    "Configuration":  { "@id": "pkg:Configuration", "@type": "@id" },
    "TypesettingApplication":  { "@id": "pkg:TypesettingApplication", "@type": "@id" },

    "package":    { "@id": "pkg:package",                   "@container": "@list" },
    "annotation": { "@id": "pkg:annotation",                "@container": "@list" },
    "dataset":    { "@id": "pkg:dataset",                   "@container": "@list" },
    "code":       { "@id": "pkg:code",                      "@container": "@list" },
    "figure":     { "@id": "pkg:figure",                    "@container": "@list" },
    "input":      { "@id": "pkg:input",     "@type": "@id", "@container": "@set"  },
    "valueType":  { "@id": "pkg:valueType", "@type": "@id" },
    "contentPath": "pkg:contentPath",
    "contentData": "pkg:contentData",
    "filePath":    "pkg:filePath",
    "registry":    "pkg:registry",

    "license": "dc:license",

    "doi": "bibo:doi",
    "abstract": "bibo:abstract",
    "journal": "bibo:journal",
    "volume": "bibo:volume",
    "issue": "bibo:issue",
    "pageStart": "bibo:pageStart",
    "pageEnd": "bibo:pageEnd",
    "pmid": "bibo:pmid",
    "issn": "bibo:issn",

    "hashAlgorithm": "nfo:hashAlgorithm",
    "hashValue": "nfo:hashValue",

    "audio":          { "@id": "sch:audio",                          "@container": "@list" },
    "video":          { "@id": "sch:video",                          "@container": "@list" },
    "keywords":       { "@id": "sch:keywords",                       "@container": "@list" },
    "about":          { "@id": "sch:about",                          "@container": "@list" },
    "requirements":   { "@id": "sch:requirements",   "@type": "@id", "@container": "@list" },
    "isBasedOnUrl":   { "@id": "sch:isBasedOnUrl",   "@type": "@id", "@container": "@list" }, //dataDependencies
    "citation":       { "@id": "sch:citation",                       "@container": "@list" },
    "contributor":    { "@id": "sch:contributor",                    "@container": "@list" },
    "codeRepository": { "@id": "sch:codeRepository", "@type": "@id" },
    "discussionUrl":  { "@id": "sch:discussionUrl",  "@type": "@id" },
    "targetProduct":  { "@id": "sch:targetProduct",  "@type": "@id" },
    "url":            { "@id": "sch:url",            "@type": "@id" },
    "contentUrl":     { "@id": "sch:contentUrl",     "@type": "@id" },
    "thumbnailUrl":   { "@id": "sch:thumbnailUrl",   "@type": "@id" },
    "downloadUrl":    { "@id": "sch:downloadUrl",    "@type": "@id" },

    "name":                  "sch:name",
    "email":                 "sch:email",
    "version":               "sch:version",
    "description":           "sch:description",
    "distribution":          "sch:distribution",
    "author":                "sch:author",
    "encoding":              "sch:encoding",
    "runtime":               "sch:runtime",
    "programmingLanguage":   "sch:programmingLanguage",
    "operatingSystem":       "sch:operatingSystem",
    "sampleType":            "sch:sampleType", //executable script ready to be run
    "contentSize":           "sch:contentSize",
    "encodingFormat":        "sch:encodingFormat",
    "catalog":               "sch:catalog",
    "datePublished":         "sch:datePublished",
    "uploadDate":            "sch:uploadDate",
    "caption":               "sch:caption",
    "thumbnail":             "sch:thumbnail",
    "exifData":              "sch:exifData",
    "height":                "sch:height",
    "width":                 "sch:width",
    "fileFormat":            "sch:fileFormat",
    "fileSize":              "sch:fileSize",
    "memoryRequirements":    "sch:memoryRequirements",
    "processorRequirements": "sch:processorRequirements",
    "storageRequirements":   "sch:storageRequirements",
    "softwareVersion":       "sch:softwareVersion",
    "contentRating":         "sch:contentRating",
    "duration":              "sch:duration",

    "Article":                 { "@id": "sch:Article",                 "@type": "@id" },
    "MedicalScholarlyArticle": { "@id": "sch:MedicalScholarlyArticle", "@type": "@id" },
    "BlogPosting":             { "@id": "sch:BlogPosting",             "@type": "@id" },
    "NewsArticle":             { "@id": "sch:NewsArticle",             "@type": "@id" },
    "ScholarlyArticle":        { "@id": "sch:ScholarlyArticle",        "@type": "@id" },
    "TechArticle":             { "@id": "sch:TechArticle",             "@type": "@id" },
    "MediaObject":             { "@id": "sch:MediaObject",             "@type": "@id" },
    "ImageObject":             { "@id": "sch:ImageObject",             "@type": "@id" },
    "AudioObject":             { "@id": "sch:AudioObject",             "@type": "@id" },
    "VideoObject":             { "@id": "sch:VideoObject",             "@type": "@id" },
    "Person":                  { "@id": "sch:Person",                  "@type": "@id" },
    "Organization":            { "@id": "sch:Person",                  "@type": "@id" },
    "DataDownload":            { "@id": "sch:DataDownload",            "@type": "@id" },
    "Dataset":                 { "@id": "sch:Dataset",                 "@type": "@id" },
    "DataCatalog":             { "@id": "sch:DataCatalog",             "@type": "@id" },
    "Code":                    { "@id": "sch:Code",                    "@type": "@id" },
    "SoftwareApplication":     { "@id": "sch:SoftwareApplication",     "@type": "@id" },


    //Open Annotation, for now, we support only a small subset of the spec
    "Annotation": { "@id": "oa:Annotation", "@type": "@id" },
    "ContentAsText": { "@id": "cnt:ContentAsText", "@type": "@id" },
    "Text": { "@id": "dctypes:Text", "@type": "@id" },
    "Tag": { "@id": "oa:Tag", "@type": "@id" },
    "SemanticTag": { "@id": "oa:SemanticTag", "@type": "@id" },
    "Motivation": { "@id": "oa:Motivation", "@type": "@id" },
    "SpecificResource": { "@id": "oa:SpecificResource", "@type": "@id" },
    "Selector": { "@id": "oa:Selector", "@type": "@id" },
    "FragmentSelector": { "@id": "oa:FragmentSelector", "@type": "@id" },
    "TextPositionSelector": { "@id": "oa:TextPositionSelector", "@type": "@id" },
    "TextQuoteSelector": { "@id": "oa:TextQuoteSelector", "@type": "@id" },
    "List": { "@id": "oa:List", "@type": "@id" },
    "HttpRequestState": { "@id": "oa:HttpRequestState", "@type": "@id" },

    "motivatedBy": { "@id": "oa:motivatedBy", "@type": "@id" }, //for the value use: oa:tagging, oa:linking,  oa:questioning, oa:replying
    "hasSource": { "@id": "oa:hasSource", "@type": "@id" },
    "hasScope": { "@id": "oa:hasScope", "@type": "@id" },
    "conformsTo": { "@id": "dc:conformsTo", "@type": "@id" },

    "item": { "@id": "oa:item", "@container": "@list" },
    "hasBody": { "@id": "oa:hasBody", "@container": "@set" },
    "hasTarget": { "@id": "oa:hasTarget", "@container": "@set" },
    "hasState": { "@id": "oa:hasState", "@container": "@set" },

    "hasSelector": "oa:hasSelector",
    "chars": "cnt:chars",
    "format": "dc:format",
    "annotatedBy": "oa:annotatedBy", //TODO make a list
    "annotatedAt": "oa:annotatedAt",
    "serializedBy": "oa:serializedBy",
    "serializedAt": "oa:serializedAt",
    "value": "rdf:value", // TODO: fix conflict with schema.org/value, maybe simply comment this line and use rdf:value
    "start": "oa:start",
    "end": "oa:end",
    "exact": "oa:exact",
    "prefix": "oa:prefix",
    "suffix": "oa:suffix"

  }
};


exports.schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',

  definitions: {
    about: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        url: { type: 'string' }
      }
    },
    width: {
      type: 'object',
      properties: {
        description: { type: 'string' },
        value:       { type: 'integer' },
        unitCode:    { type: 'string' }
      }
    },
    citation: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          url: { type: 'string' }
        }
      }
    },
    person: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        givenName: { type: 'string' },
        familyName: { type: 'string' },
        email: { type: 'string' }
      }
    },
    keywords: { type: 'array', items: { type: 'string' } },
    isBasedOnUrl: { type: 'array', items: { type: 'string' } },
    encoding: { //env_.tar.gz
      type: 'object',
      properties: {
        contentUrl: { type: 'string' },
        contentSize: { type: 'integer' },
        encodingFormat: { type: 'string' },
        hashAlgorithm: { type: 'string' },
        hashValue: { type: 'string' },
        uploadDate: { type: 'string' }
      }
    },
    package: {
      type: 'object',
      properties: {
        name:    { type: 'string' },
        version: { type: 'string' },
        url:     { type: 'string' }
      }
    }
  },



  type: 'object',
  properties: {
    name: { type: 'string' },
    version: { type: 'string' },
    private: { type: 'boolean' },
    license: { type: 'string' },
    description: { type: 'string' },
    contentRating: { type: 'string' },
    citation: { "$ref": "#/definitions/citation" },
    about: { "$ref": "#/definitions/about" },
    author: { "$ref": "#/definitions/person" },
    contributor: { type: 'array', items: { "$ref": "#/definitions/person" } },
    keywords: { "$ref": "#/definitions/keywords" },
    isBasedOnUrl: { "$ref": "#/definitions/isBasedOnUrl" },
    discussionUrl: { type: 'string' },
    encoding: { "$ref": "#/definitions/encoding" },
    registry: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        url: { type: 'string' }
      }
    },

    datePublished: { type: 'string' },

    dataset: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string'},
          license: { type: 'string' },
          description: { type: 'string'},
          keywords: { "$ref": "#/definitions/keywords" },
          about: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                valueType: { type: 'string' },
                sameAs: { type: 'string' }
              }
            }
          },
          contentRating: { type: 'string' },
          isBasedOnUrl: { "$ref": "#/definitions/isBasedOnUrl" },
          citation: { "$ref": "#/definitions/citation" },
          discussionUrl: { type: 'string' },
          author: { "$ref": "#/definitions/person" },
          contributor: { type: 'array', items: { "$ref": "#/definitions/person" } },
          thumbnailUrl: { type: 'string' },
          distribution: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                contentUrl: { type: 'string' },
                contentPath: { type: 'string' },
                contentData: { type: ['string', 'object', 'array', 'number', 'boolean'] },
                contentSize: { type: 'integer' },
                encodingFormat: { type: 'string' },
                hashAlgorithm: { type: 'string' },
                hashValue: { type: 'string' },
                uploadDate: { type: 'string' },
                encoding: { "$ref": "#/definitions/encoding" } //in case resource can be further compressed
              }
            }
          },
          catalog: { "$ref": "#/definitions/package" }
        },
        required: [ 'name' ],
      }
    },

    code: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string'},
          license: { type: 'string' },
          description: { type: 'string'},
          keywords: { "$ref": "#/definitions/keywords" },
          about: { "$ref": "#/definitions/about" },
          contentRating: { type: 'string' },
          isBasedOnUrl: { "$ref": "#/definitions/isBasedOnUrl" },
          citation: { "$ref": "#/definitions/citation" },
          discussionUrl: { type: 'string' },
          author: { "$ref": "#/definitions/person" },
          contributor: { type: 'array', items: { "$ref": "#/definitions/person" } },
          thumbnailUrl: { type: 'string' },

          programmingLanguage: {
            type: 'object',
            properties: {
              name: { type: 'string' },
            },
            required: [ 'name' ]
          },
          runtime: { type: 'string' },
          sampleType: { type: 'string'}, //preview
          codeRepository: { type: 'string'},

          targetProduct: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                operatingSystem: { type: 'string' },
                requirements:  { type: 'array', items: { type: 'string'} },
                memoryRequirements: { type: 'string' },
                processorRequirements: { type: 'string' },
                storageRequirements: { type: 'string' },
                bundlePath: { type: 'string' }, //non semantic, not defined in the ontology, just here for ref.
                filePath: { type: 'string' },
                downloadUrl: { type: 'string' },
                fileSize: { type: 'integer' },
                fileFormat: { type: 'string' },
                hashAlgorithm: { type: 'string' },
                hashValue: { type: 'string' },
                input:  { type: 'array', items: { type: 'string'} },
                encoding: { "$ref": "#/definitions/encoding" }, //in case resource can be further compressed,
                softwareVersion: { type: 'string' }
              }
            }
          },

          package: { "$ref": "#/definitions/package" }
        },
        required: [ 'name' ]
      }
    },

    audio: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string'},
          license: { type: 'string' },
          description: { type: 'string'},
          keywords: { "$ref": "#/definitions/keywords" },
          about: { "$ref": "#/definitions/about" },
          contentRating: { type: 'string' },
          isBasedOnUrl: { "$ref": "#/definitions/isBasedOnUrl" },
          citation: { "$ref": "#/definitions/citation" },
          discussionUrl: { type: 'string' },
          author: { "$ref": "#/definitions/person" },
          contributor: { type: 'array', items: { "$ref": "#/definitions/person" } },
          thumbnailUrl: { type: 'string' },

          transcript:        { type: 'string' },

          audio: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                contentUrl:     { type: 'string' },
                contentPath:    { type: 'string' },
                contentSize:    { type: 'integer' },
                hashAlgorithm:  { type: 'string' },
                hashValue:      { type: 'string' },
                encodingFormat: { type: 'string' },
                uploadDate:     { type: 'string' },
                encoding: { "$ref": "#/definitions/encoding" } //in case resource can be further compressed,
              }
            }
          },

          package: { "$ref": "#/definitions/package" }
        }
      }
    },

    video: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string'},
          license: { type: 'string' },
          description: { type: 'string'},
          keywords: { "$ref": "#/definitions/keywords" },
          about: { "$ref": "#/definitions/about" },
          contentRating: { type: 'string' },
          isBasedOnUrl: { "$ref": "#/definitions/isBasedOnUrl" },
          citation: { "$ref": "#/definitions/citation" },
          discussionUrl: { type: 'string' },
          author: { "$ref": "#/definitions/person" },
          contributor: { type: 'array', items: { "$ref": "#/definitions/person" } },
          thumbnailUrl: { type: 'string' },

          caption: { type: 'string' },
          width: { "$ref": "#/definitions/width" },
          height: { "$ref": "#/definitions/width" },

          video: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                contentUrl:     { type: 'string' },
                contentPath:    { type: 'string' },
                contentSize:    { type: 'integer' },
                hashAlgorithm:  { type: 'string' },
                hashValue:      { type: 'string' },
                encodingFormat: { type: 'string' },
                uploadDate:     { type: 'string' },
                encoding: { "$ref": "#/definitions/encoding" } //in case resource can be further compressed,
              }
            }
          },

          package: { "$ref": "#/definitions/package" }
        }
      }
    },

    figure: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string'},
          license: { type: 'string' },
          description: { type: 'string'},
          keywords: { "$ref": "#/definitions/keywords" },
          about: { "$ref": "#/definitions/about" },
          contentRating: { type: 'string' },
          isBasedOnUrl: { "$ref": "#/definitions/isBasedOnUrl" },
          citation: { "$ref": "#/definitions/citation" },
          discussionUrl: { type: 'string' },
          author: { "$ref": "#/definitions/person" },
          contributor: { type: 'array', items: { "$ref": "#/definitions/person" } },
          thumbnailUrl: { type: 'string' },

          caption:        { type: 'string' },

          figure: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                exifData: { type: 'string' },
                width: { "$ref": "#/definitions/width" }, //pictures of different sizes are considered as different encoding of the resource
                height: { "$ref": "#/definitions/width" },

                contentUrl:     { type: 'string' },
                contentPath:    { type: 'string' },
                contentSize:    { type: 'integer' },
                hashAlgorithm:  { type: 'string' },
                hashValue:      { type: 'string' },
                encodingFormat: { type: 'string' },
                uploadDate:     { type: 'string' },
                encoding: { "$ref": "#/definitions/encoding" } //in case resource can be further compressed,
              }
            }
          },

          package: { "$ref": "#/definitions/package" }
        }
      }
    },

    article: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string'},
          license: { type: 'string' },
          description: { type: 'string'},
          keywords: { "$ref": "#/definitions/keywords" },
          about: { "$ref": "#/definitions/about" },
          contentRating: { type: 'string' },
          isBasedOnUrl: { "$ref": "#/definitions/isBasedOnUrl" },
          citation: { "$ref": "#/definitions/citation" },
          discussionUrl: { type: 'string' },
          author: { "$ref": "#/definitions/person" },
          contributor: { type: 'array', items: { "$ref": "#/definitions/person" } },
          thumbnailUrl: { type: 'string' },

          abstract: { type: 'string'},
          articleBody: { type: 'string'},

          encoding: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                contentUrl:     { type: 'string' },
                contentPath:    { type: 'string' },
                contentSize:    { type: 'integer' },
                hashAlgorithm:  { type: 'string' },
                hashValue:      { type: 'string' },
                encodingFormat: { type: 'string' },
                uploadDate:     { type: 'string' },
                encoding: { "$ref": "#/definitions/encoding" } //in case resource can be further compressed,
              }
            }
          },

          package: { "$ref": "#/definitions/package" }
        }
      }
    }
  },
  required: ['name', 'version']
};


/**
 * add @type to an obj if possible
 */
function _addType(x, type, onlyIfEmpty){

  if( (typeof x !== 'object') || Array.isArray(x) ){
    return;
  }

  //x is an obj
  if( !('@type' in x) || !x['@type'] ){
    x['@type'] = type;
  } else if(!onlyIfEmpty && Array.isArray(x['@type'])){
    if(x['@type'].indexOf(type) === -1){
      x['@type'].push(type);
    }
  } else if(!onlyIfEmpty && typeof x['@type'] === 'string'){
    if(x['@type'] !== type){
      x['@type'] = [x['@type'], type];
    }
  }

  return x;
};


/**
 * modifies package in place to add @id, @type and optionaly @context
 */
exports.linkPackage = function(pkg, options){
  options = options || {addCtx: true};
  if(! ('addCtx' in options)){
    options.addCtx = true;
  }

  if(options.addCtx){
    var ctx = options.ctx || URL;
    pkg["@context"] = ctx;
  }

  pkg['@id'] = pkg.name + '/' + pkg.version;
  pkg['@type'] = (pkg.dataset && pkg.dataset.length)? ['Package', 'DataCatalog'] : ['Package'];

  if( 'author' in pkg && !('@type' in pkg.author) ){ //pre-existing type might be Organization
    _addType(pkg.author, 'Person');
  }

  if('contributor' in pkg){
    pkg.contributor.forEach(function(c){
      if ( !('@type' in c) ) { //pre-existing type might be Organization
        _addType(c, 'Person');
      }
    });
  }

  if('dataset' in pkg){
    pkg.dataset.forEach(function(r){
      linkDataset(r, pkg.name, pkg.version);
    });
  }

  if('code' in pkg){
    pkg.code.forEach(function(r){
      linkCode(r, pkg.name, pkg.version);
    });
  }

  if('figure' in pkg){
    pkg.figure.forEach(function(r){
      linkFigure(r, pkg.name, pkg.version);
    });
  }

  if('audio' in pkg){
    pkg.audio.forEach(function(r){
      linkAudio(r, pkg.name, pkg.version);
    });
  }

  if('video' in pkg){
    pkg.video.forEach(function(r){
      linkVideo(r, pkg.name, pkg.version);
    });
  }

  if('article' in pkg){
    pkg.article.forEach(function(r){
      linkArticle(r, pkg.name, pkg.version);
    });
  }

  pkg.registry = { name: "Standard Analytics IO", url: BASE };

  return pkg;
};


/**
 * modifies dataset in place to add @id, @type
 */
function linkDataset(dataset, name, version){
  if('name' in dataset){
    dataset['@id'] = name + '/' + version + '/dataset/' + dataset.name;
  }

  _addType(dataset, 'Dataset');
  if(dataset.distribution){
    dataset.distribution.forEach(function(x){
      _addType(x, 'DataDownload');
    });
  }

  dataset.catalog = { '@type': ['Package', 'DataCatalog'], name: name, version: version, url: name + '/' + version };

  return dataset;
};
exports.linkDataset = linkDataset;


/**
 * modifies dataset in place to add @id, @type
 */
function linkArticle(article, name, version){
  if('name' in article){
    article['@id'] = name + '/' + version + '/article/' + article.name;
  }

  _addType(article, 'Article');
  if(article.encoding){
    article.encoding.forEach(function(x){
      _addType(x, 'MediaObject');
    });
  }

  article.package = { '@type': 'Package', name: name, version: version, url: name + '/' + version };

  return article;
};
exports.linkArticle = linkArticle;


/**
 * modifies code in place to add @id, @type
 */
function linkCode(code, name, version){
  if('name' in code){
    code['@id'] = name + '/' + version + '/code/' + code.name;
  }

  _addType(code, 'Code');

  if(code.targetProduct){
    code.targetProduct.forEach(function(x){
      _addType(x, 'SoftwareApplication');
    });
  }

  code.package = { '@type': 'Package', name: name, version: version, url: name + '/' + version };

  return code;
};
exports.linkCode = linkCode;

/**
 * modifies code in place to add @id, @type
 */
function linkFigure(figure, name, version){
  if('name' in figure){
    figure['@id'] = name + '/' + version + '/figure/' + figure.name;
  }

  _addType(figure, 'ImageObject');
  _addType(figure.height, 'QuantitativeValue');
  _addType(figure.width, 'QuantitativeValue');
  if(figure.figure){
    figure.figure.forEach(function(x){
      _addType(x, 'ImageObject');
    });
  }

  figure.package = { '@type': 'Package', name: name, version: version, url: name + '/' + version };

  return figure;
};
exports.linkFigure = linkFigure;

/**
 * modifies code in place to add @id, @type
 */
function linkAudio(audio, name, version){
  if('name' in audio){
    audio['@id'] = name + '/' + version + '/audio/' + audio.name;
  }

  _addType(audio, 'AudioObject');
  if(audio.audio){
    audio.audio.forEach(function(x){
      _addType(x, 'AudioObject');
    });
  }

  audio.package = { '@type': 'Package', name: name, version: version, url: name + '/' + version };

  return audio;
};
exports.linkAudio = linkAudio;

/**
 * modifies code in place to add @id, @type
 */
function linkVideo(video, name, version){
  if('name' in video){
    video['@id'] = name + '/' + version + '/video/' + video.name;
  }

  _addType(video, 'ImageObject');
  _addType(video.height, 'QuantitativeValue');
  _addType(video.width, 'QuantitativeValue');
  if(video.video){
    video.video.forEach(function(x){
      _addType(x, 'VideoObject');
    });
  }

  video.package = { '@type': 'Package', name: name, version: version, url: name + '/' + version };

  return video;
};
exports.linkVideo = linkVideo;



/**
 * return parsed URL if the uri if from this registry
 */
function _parseUrl(uri){

  var absUrl = (isUrl(uri)) ? uri : url.resolve(BASE, uri);
  var urlObj = url.parse(absUrl, true);

  if(urlObj.hostname === url.parse(BASE).hostname){ //it's a pkg of this registry
    var pathname = urlObj.pathname.replace(/^\//, '');
    var splt = pathname.split('/'); //name, version, ...

    if(splt.length < 2){
      throw new Error('invalid URI: '+ uri);
    }

    return {
      urlObj: urlObj,
      splt: splt,
      pathname: pathname
    };

  }

};


/**
 * validate isBasedOnUrl and returns a dataDependencies hash
 */
exports.dataDependencies = function(isBasedOnUrl){

  if(!isBasedOnUrl) return undefined;

  var dataDependencies = {};

  isBasedOnUrl.forEach(function(uri){
    var parsed = _parseUrl(uri);
    if(!parsed) return;

    var name = parsed.splt[0];
    var version = parsed.splt[1];
    if(version === 'latest'){
      version = (parsed.urlObj.query && parsed.urlObj.query.range) || '*';
    }

    if(!semver.validRange(version)){
      throw new Error('invalid version/range '+ version);
    }

    if(name in dataDependencies){
      throw new Error(name + ' is already listed as dependencies');
    }
    dataDependencies[name] = version;

  });

  return dataDependencies;
};


/**
 * make sure that link to pkg hosted on the registry respect the
 * versioning package used
 *
 * return parsed uri if within pkg link
 */
function validateRequiredUri(uri, name, version, dataDependencies){

  var dataDependencies = dataDependencies || {};

  var parsed = _parseUrl(uri);
  if(!parsed) return;

  if (parsed.splt[0] === name){ //whithin pkg link
    if (parsed.splt[1] !== version){
      throw new Error('version mismatch for :' + uri);
    } else {
      return parsed;
    };
  } else { //link to another pkg on this registry: does it satisfies the data dependencies constraints ?

    if(!(parsed.splt[0] in dataDependencies)){
      throw new Error( parsed.splt[0] + '/' + parsed.splt[1] + ' is not listed in isBasedOnUrl (required in ' + uri  + ')');
    } else {
      //check version match
      if(!semver.satisfies(parsed.splt[1], dataDependencies[parsed.splt[0]])){
        throw new Error( uri + ' does not respect semver requirement of isBasedOnUrl (' + dataDependencies[parsed.splt[0]] + ')');
      };
    }

  }
};

/**
 * suppose that pkg schema has been validated
 */
exports.validateRequiredUri = validateRequiredUri;


/**
 * validate uri and in case it's an uri pointing to the current doc,
 * check that the resource pointed to exists and if it does return it.
 * If a resource points to code, check that the code list it as it inputs
 */
function _validateLink(uri, pkg, dataDependencies){

  var parsed = validateRequiredUri(uri, pkg.name, pkg.version, dataDependencies);
  if(parsed){ //uri from this doc, validate that there is a matching resource
    var type = parsed.splt[2];

    if(['code', 'dataset', 'figure', 'audio', 'video', 'article'].indexOf(type) === -1){
      throw new Error(  uri + ' should contain /dataset/, /code/, /figure/, /audio/, /video/ or /article/');
    } else {
      var array = pkg[type] || [];
    }

    var name = parsed.splt[3];
    var matched;
    if(name){
      matched = array.filter(function(x){return x.name === name;})[0];
    }

    if(matched){

      return {resource: matched, type:type};

    } else {

      throw new Error( 'input: ' + uri + ' does not have a matching resource within this package');

    }

  }

};

/**
 * validateRequire AND name
 */
exports.validateRequire = function(pkg, dataDependencies){

  var dataDependencies = dataDependencies || exports.dataDependencies(pkg.isBasedOnUrl);

  ['code', 'dataset', 'figure', 'audio', 'video', 'article'].forEach(function(t){

    var resource = pkg[t] || [];
    resource.forEach(function(r){
      validateName(r.name);


      if(r.isBasedOnUrl){
        r.isBasedOnUrl.forEach(function(uri){
          _validateLink(uri, pkg, dataDependencies);
        });
      }

      if(r.citation){
        r.citation.forEach(function(c){
          if(c.url){
            _validateLink(c.url, pkg, dataDependencies);
          }
        });
      }

      if ( 'targetProduct' in r && 'input' in r.targetProduct ) {
        r.targetProduct.input.forEach(function(uri){
          _validateLink(uri, pkg, dataDependencies);
        });
      }

    });

  });

};


/**
 * inspired by npm name validation
 */
function validateName(name){

  if (!name) throw new Error('no name');

  var n = name.trim();

  if ( !n || n.charAt(0) === "."
       || !n.match(/^[a-zA-Z0-9]/)
       || n.match(/[\/\(\)&\?#\|<>@:%\s\\\*'"!~`]/)
       || ['auth', 'rmuser', 'adduser', 'owner', 'search', 'package.jsonld', 'dataset', 'code', 'figure', 'audio', 'video', 'about', 'ld_packages', 'favicon.ico', 'r'].indexOf(n.toLowerCase()) !== -1
       || n !== encodeURIComponent(n) ) {

    throw new Error('invalid name');
  }

};
exports.validateName = validateName;
