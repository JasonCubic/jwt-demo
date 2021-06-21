<template>
  <div class="container">
    <div>
      <b-card :title="quote.text" :sub-title="quote.author" v-for="(quote, quoteIndex) in quotes" :key="quoteIndex" class="mt-2" />
      <b-button variant="primary" class="mt-2" @click="getQuotes">Get Another Quote</b-button>
    </div>
  </div>
</template>

<script>

function handleMounted() {
  this.getQuotes();
}

async function getQuotes() {
  const startTime = Date.now();
  let response;
  try {
    response = await this.$axios({
      method: 'GET',
      baseURL: '/',
      url: '/jwtdemo/api/quotes',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.$store.state.token.accessToken}`,
      },
    });
    const AmountOfTimeTheQueryTook = Date.now() - startTime;
    console.info(`AJAX TIME (${AmountOfTimeTheQueryTook / 1000.0}s), getQuotes response: `, response);
  } finally {
    this.quotes = response?.data?.quotes;
  }
}

export default {
  name: 'landing',
  mounted: handleMounted,
  data() {
    return {
      quotes: [],
    };
  },
  methods: {
    getQuotes,
  },
};
</script>

<style>

</style>
