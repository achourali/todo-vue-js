<template>
	<ul class="w-full tags-list flex gap-x-4 overflow-x-auto">
		<li
			v-for="(tag, index) in tagsData"
			:key="index"
			ref="items"
			@click="updateFilter(index, tag)"
			class="tags-item flex items-center gap-x-2 w-full py-1 px-3 rounded-lg"
		>
			<Tag :tagName="tag">
				<p>{{ tag }}</p>
			</Tag>
		</li>
	</ul>
</template>

<script>
import Tag from '@/components/Tag.vue';

export default {
	name: 'FilterNav',
	components: {
		Tag
	},
	data() {
		return {
			tagsData: ['work', 'study', 'entertainment', 'familly']
		};
	},
	methods: {
		updateFilter(filterIndex, filterName) {
			this.$store.commit('GET_FILTER_CHOICE', filterName);
			this.$refs.items[filterIndex].classList.toggle('tag-active');
		}
	}
};
</script>

<style></style>
