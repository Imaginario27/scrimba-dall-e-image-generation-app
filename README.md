# DALL-E Image Generation App
===========================

This application allows users to generate images using DALL-E by providing custom prompts and settings for image size, quality, and style. Users can also select from different image formats such as Square, Portrait, and Landscape.

## Features
--------

-   **Custom Prompt Input**: Users can enter any text prompt to guide DALL-E in generating images.
-   **Example Prompts**: A set of example prompts helps users get started and provides inspiration.
-   **Settings**:
    -   **Image Size**: Choose from different dimensions:
        -   Square (1024x1024)
        -   Portrait (1024x1792)
        -   Landscape (1792x1024)
    -   **HD Quality**: Option to enhance the image quality.
    -   **Style**: Select between different visual styles, e.g., Vivid and Natural.

## How to Use
----------

1.  **Enter a Prompt**: Type a description of the image you want DALL-E to generate. For example, "A steampunk city with gear-driven machines."
2.  **Select Image Settings**:
    -   Choose the image size from the dropdown.
    -   Toggle the HD Quality option if needed.
    -   Select a style from the available options (e.g., Vivid or Natural).
3.  **Generate the Image**: Click the **Generate** button to create the image.
4.  **Download**: Once the image is generated, use the **Download Image** button to save it.

Example
-------

**Revised Prompt**: After entering a simple prompt, DALL-E may provide an enhanced description, refining the scene for better results.

## Installation
------------

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/dalle-image-generator.git
    cd dalle-image-generator
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npm run dev
    ```

## Technologies Used
-----------------

-   **Nuxt 3**: Framework for the application.
-   **OPENAI API**: For image generation.
-   **Tailwind CSS**: For styling components.

## Configuration
-------------

The application requires an API key from OpenAI for DALL-E image generation. Set up the API key in your environment variables:

```bash
OPENAI_API_KEY=your_openai_api_key
```

## Credits
------------

Special thanks to Scrimba AI Career Path for the inspiration and resources that made this project possible.
