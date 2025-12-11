$content = Get-Content 'views\ajouterproduit.ejs' -Raw -Encoding UTF8
$content = $content -replace 'const hasSubCategories = <%- JSON\.stringify\(user\?\.hasSubCategories \|\| false\) %>;', 'const hasSubCategories = userData && userData.hasSubCategories ? userData.hasSubCategories : false;'
$content = $content -replace 'const productCategoryId = <%- JSON\.stringify\(product\?\.produit\?\.categorie\?\._id \|\| ''''\) %>;', 'const productCategoryId = productData && productData.produit && productData.produit.categorie && productData.produit.categorie._id ? productData.produit.categorie._id : ''''';'
$content = $content -replace 'const catId = <%- JSON\.stringify\(product\?\.produit\?\.categorie\?\._id \|\| ''''\) %>', 'const catId = productData && productData.produit && productData.produit.categorie && productData.produit.categorie._id ? productData.produit.categorie._id : ''''';'
Set-Content 'views\ajouterproduit.ejs' -Value $content -NoNewline -Encoding UTF8
