<script>
	let id_author = '';
	let maxim = '';
	let result = '';
	
	async function doPost () {
		const res = await fetch('../api/maxims/', {
			method: 'POST',
			body: JSON.stringify({
				id_author,
				maxim
			})
		})
		
		const json = await res.json()
		result = JSON.stringify(json)
	}
</script>


<input bind:value={id_author} />
<input bind:value={maxim} />
<button type="button" on:click={doPost}>
	Enregistrer
</button>
<p>
	Result:
</p>
<pre>
{result}
</pre>