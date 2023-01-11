---
title: "Prueba Stable Diffusion Gratis mediante Google Colab"
date: 2022-12-31
toc: true
topic: ia
draft: false
tags:
    - IA
    - python
---

Este articulo es una actualización del articulo [Probar Stable Diffusion Gratis usando Google Colab | Usarral](https://usarral.medium.com/probar-stable-diffusion-gratis-usando-google-colab-usarral-8f8233ead7e1) que escribí hace un tiempo. En este articulo se explica como probar Stable Diffusion 1.4 usando Google Colab de forma gratuita.

## ¿Qué es Stable Diffusion?

Stable Diffusion es una herramienta de IA que permite generar imágenes basandose en un input. El input puede ser una imagen o un texto. La herramienta es muy potente y permite generar imágenes de gran calidad. En este articulo se explica como probar Stable Diffusion 2.0 usando Google Colab de forma gratuita.

## ¿Qué es Google Colab?

Google Colab es un servicio de Google que permite ejecutar código de Python en la nube. Es muy útil para probar código de Python sin necesidad de instalar nada en el ordenador. Además, permite ejecutar código en GPU de forma gratuita.

## ¿Qué necesito para probar Stable Diffusion 2.0?

Para probar Stable Diffusion 2.0 necesitas una cuenta de Google. Si no tienes una puedes crear una [aquí](https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp).

## ¿Cómo probar Stable Diffusion 2.0?

Para probar Stable Diffusion 2.0 debes seguir los siguientes pasos:

1. Abre el cuaderno de [Google Colab](https://colab.research.google.com/github/qunash/stable-diffusion-2-gui/blob/main/stable_diffusion_2_0.ipynb#scrollTo=gId0-asCBVwL) creado por [anzorq](https://twitter.com/hahahahohohe)
2. Haz click en el botón play de la celda 1, justo debajo de la celda de texto "Instalar dependencias", para instalar las dependencias necesarias.
3. Una vez acabe de instalar las dependencias, pulsa el botón play de la celda 2, justo debajo de la celda de texto "Run the app", para ejecutar la aplicación.
4. Una vez inicie la ejecución nos debería dar una respuesta similar a esta donde ID es una combinación de letras y números:

    ```
    Running on public URL: <https://ID.gradio.live>
    ```

5. Copia la URL que aparece en la respuesta y pégala en tu navegador. Deberías ver una pantalla similar a esta:
![Stable Diffusion GUI](/images/posts/2022/12/gui.png)
6. Aqui ya solo quedaría probar la herramienta. Para ello, puedes usar una imagen o un texto. Para usar una imagen, pulsa el botón "Upload Image" y selecciona la imagen que quieras usar. Para usar un texto, pulsa el botón "Text Input" y escribe el texto que quieras usar. Una vez hayas seleccionado la imagen o el texto, pulsa el botón "Generate Image" para generar la imagen.
7. Si quieres guardar la imagen, pulsa el botón derecho del ratón sobre la imagen y selecciona "Guardar imagen como...".
8. Tambien puedes modificar los parametros de generación de la imagen para obtener resultados diferentes.

Articulo publicado primero en [Blog | Usarral](https://blog.usarral.com/2022/12/31/prueba-stable-diffusion-gratis-mediante-google-colab/)
