<template>
	<div :class="`tag-${tagName}`" class="tag"></div>
	<slot></slot>
</template>

<script>
export default {
	name: 'Tag',
	props: ['tagName'],
	data() {
		return {};
	}
};
</script>

<style>
/* TAG ELEMENTS */
.tag {
	background: theme('colors.purple');
	width: 20px;
	height: 20px;
	border-radius: 50%;
}
.tag-work {
	background: theme('colors.purple');
}
.tag-study {
	background: theme('colors.lavender');
}
.tag-entertainment {
	background: theme('colors.pink');
}
.tag-familly {
	background: theme('colors.green-light');
}
</style>
