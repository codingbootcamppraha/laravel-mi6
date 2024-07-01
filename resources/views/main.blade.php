<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    @vite('resources/css/app.scss')
</head>
<body>
    <div id="root"></div>

    <!-- React app entry file script will be added -->
    @viteReactRefresh
    @vite('resources/js/people-of-interest.jsx')
    
</body>
</html>