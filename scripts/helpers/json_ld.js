/**
 * Builds JSON-LD structured data for current page according to its type (page or post).
 *
 * @returns {string} - JSON-LD structured data
 */
function jsonLd() {
  const page = this.page;
  const config = this.config;
  const theme = this.theme;
  const authorEmail = theme.author.email;
  const authorImage = theme.author.picture || (authorEmail ? this.gravatar(authorEmail) : null);
  const authorLinks = theme.sidebar.author_links;
  const links = [];

  if (authorLinks) {
    for (const key in authorLinks) {
      if (authorLinks.hasOwnProperty(key)) {
        const link = authorLinks[key].url;

        if (link) {
          links.push(link);
        }
      }
    }
  }

  const author = {
    '@type': 'Person',
    name: config.author,
    sameAs: links
  };
  // Google does not accept `Person` as item type for the publisher property
  const publisher = Object.assign({}, author, {'@type': 'Organization'});
  let schema = {};

  if (authorImage) {
    author.image = authorImage;
    publisher.image = authorImage;
    publisher.logo = {
      '@type': 'ImageObject',
      url: authorImage
    };
  }

  if (this.is_post()) {
    let images = [];
    schema = {
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      author: author,
      articleBody: this.strip_html(page.content),
      dateCreated: page.date.format(),
      dateModified: page.updated.format(),
      datePublished: page.date.format(),
      description: this.strip_html(page.excerpt),
      headline: page.title,
      image: images,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': this.url_for(page.permalink)
      },
      publisher,
      url: this.url_for(page.permalink)
    };

    if (page.tags && page.tags.length > 0) {
      schema.keywords = page.tags.map((tag) => tag.name).join(', ');
    }

    if (page.photos && page.photos.length > 0) {
      images = images.concat(page.photos);
    }

    if (page.coverImage) {
      images.unshift(page.coverImage);
    }

    if (page.thumbnailImage || page.coverImage) {
      images.unshift(page.thumbnailImage);
      schema.thumbnailUrl = page.thumbnailImage || page.coverImage;
    }

    schema.image = images;
  }
  else if (this.is_page() || this.is_home()) {
    schema = {
      '@context': 'http://schema.org',
      '@type': 'Website',
      '@id': config.url,
      author: author,
      name: config.title,
      description: config.description,
      url: config.url
    };

    if (config.keywords && config.keywords.length) {
      schema.keywords = config.keywords.join(', ');
    }
  }

  return '<script type="application/ld+json">' + JSON.stringify(schema) + '</script>';
}

hexo.extend.helper.register('json_ld', jsonLd);
