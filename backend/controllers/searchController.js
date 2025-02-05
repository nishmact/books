const client = require('../config/elasticsearch'); // Import Elasticsearch client

const searchBooks = async (req, res) => {
    try {
       
        const { query } = req.query;

        const result = await client.search({
            index: 'books',
            body: {
                query: {
                    bool: {
                        should: [
                            {
                                wildcard: {
                                    title: `*${query}*`
                                }
                            },
                            {
                                wildcard: {
                                    author: `*${query}*`
                                }
                            },
                            {
                                wildcard: {
                                    description: `*${query}*`
                                }
                            }
                        ]
                    }
                }
            }
        });

        res.status(200).json(result.hits.hits.map(hit => hit._source));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { searchBooks };

