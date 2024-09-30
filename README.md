**Cryptocurrency Image Generator**<br>
**Description**<br>
This React-based web application allows users to generate customized images with cryptocurrency-related information. Users can input details such as coin name, total profit, and initial investment, and the app will create a visually appealing image with this information overlaid on a template.

**Features**<br>
Dynamic image generation based on user input
Real-time Solana price fetching from CoinGecko API
Automatic ROI calculation
Toggle between light and dark templates
Download functionality for generated images

**Technologies Used**<br>
React<br>
Vite<br>
Canvas API for image manipulation<br>
CoinGecko API for real-time Solana price data

**Setup**<br>
Clone the repository

Install dependencies:
```npm install```

Run the development server:
```npm run dev```


**Usage**<br>
Enter the coin name, total profit, and initial investment in the provided input fields.
The application will automatically calculate the ROI and fetch the current Solana price.
Toggle between light and dark templates using the checkbox.
The image will update in real-time as you input data.
Click the "Download Image" button to save the generated image.

**Customization**<br>
The application uses two template images: template.png and template-dark2.png. You can replace these in the assets folder to use your own templates.
Font styles and sizes can be adjusted in the drawCanvas function.

**Notes**<br>
The Solana price is fetched from the CoinGecko API on component mount.
Ensure you have an active internet connection for real-time Solana price updates.
