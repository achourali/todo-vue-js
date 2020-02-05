// TODO: FilterNav feature: refacto: - transformer la ligne 26 à 38 du fichier src/views/AddTodo.vue

<template>
	<ul class="w-full tags-list flex gap-x-4 overflow-x-auto">
		<li
			v-for="(tag, index) in tagsData"
			:key="index"
			ref="items"
			@click="updateFilter(tag, index), getFilters(tag)"
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
	props: ['getFilters'],
	emits: ['filterChange'],
	components: {
		Tag
	},
	data() {
		return {
			tagsData: ['work', 'study', 'entertainment', 'familly']
		};
	},
	methods: {
		updateFilter(filterName, filterIndex) {
			this.$refs.items[filterIndex].classList.toggle('tag-active');
			this.$emit('filterChange', filterName);
		}
	}
};
</script>

<style></style>
