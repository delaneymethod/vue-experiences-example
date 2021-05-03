<template>
	<BaseCard>
		<h2>Submitted Experiences</h2>
		<BaseButton @click="loadExperiences">Load Submitted Experiences</BaseButton>
		<p v-if="isLoading">Loading...</p>
		<p v-else-if="!isLoading && error">{{ error }}</p>
		<p v-else-if="!isLoading && (!results || results.length === 0)">
			No stored experiences found. Start adding some survey results first.
		</p>
		<ul v-else>
			<SurveyResult
				v-for="result in results"
				:key="result.id"
				:name="result.name"
				:rating="result.rating"
			/>
		</ul>
	</BaseCard>
</template>

<script>
import SurveyResult from '@/components/survey/SurveyResult';
import BaseCard from '@/components/UI/BaseCard';
import BaseButton from '@/components/UI/BaseButton';

export default {
	name: 'UserExperiences',
	components: {
		SurveyResult,
		BaseCard,
		BaseButton
	},
	data() {
		return {
			results: [],
			isLoading: false,
			error: null
		};
	},
	methods: {
		loadExperiences() {
			this.isLoading = true;
			this.error = null;

			fetch('https://vue-http-demo-85e9e.firebaseio.com/surveys.json')
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
				})
				.then((data) => {
					this.isLoading = false;

					const results = [];

					for (const id in data) {
						results.push({
							id,
							name: data[id].name,
							rating: data[id].rating
						});
					}

					this.results = results;
				})
				.catch(() => {
					this.isLoading = false;

					this.error = 'Failed to fetch data - please try again later.';
				});
		}
	},
	mounted() {
		this.loadExperiences();
	}
};
</script>

<style lang="scss" scoped>
ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
</style>
