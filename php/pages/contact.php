<section class="page-intro container">
  <div class="breadcrumb"><a href="/">Home</a><span>/</span>Let’s connect</div>
  <span class="eyebrow">Let’s connect</span>
  <h1>Let's Find the Right Workspace for You</h1>
  <p>
    Tell us what you need, and our team can help you explore the right workspace
    for your work or business.
  </p>
</section>
<section class="container contact-grid">
  <form novalidate="" class="inquiry-form">
    <div class="form-heading">
      <h2>Let’s start a conversation.</h2>
      <p>A few details will help us understand your needs.</p>
    </div>
    <?php if (!$inquiryEnabled): ?><div class="notice" role="status">
      Online enquiries are awaiting delivery setup. This form cannot send your
      details yet.
    </div><?php endif; ?>
    <div class="form-grid">
      <label for="name"
        >Full name<!-- -->
        <span>*</span
        ><input
          id="name"
          type="text"
          required=""
          autocomplete="name"
          placeholder="Your name"
          aria-invalid="false"
          name="name" /></label
      ><label for="email"
        >Email address<!-- -->
        <span>*</span
        ><input
          id="email"
          type="email"
          required=""
          autocomplete="email"
          placeholder="you@example.com"
          aria-invalid="false"
          name="email" /></label
      ><label for="phone"
        >Phone number<!-- -->
        <span>*</span
        ><input
          id="phone"
          type="tel"
          required=""
          autocomplete="tel"
          placeholder="Your contact number"
          aria-invalid="false"
          name="phone" /></label
      ><label for="workspace"
        >Workspace requirement <span>*</span
        ><select
          id="workspace"
          name="workspace"
          required=""
          aria-invalid="false"
        >
          <option value="" selected="">Select your workspace</option>
          <option>Coworking Space</option>
          <option>Dedicated Desk</option>
          <option>Individual Seating</option>
          <option>Conference Room</option>
          <option>Startup Workspace</option>
          <option>Other</option>
        </select></label
      ><label for="date" class="full"
        >Preferred visit date <span class="optional">(optional)</span
        ><input id="date" type="date" aria-invalid="false" name="date" /></label
      ><label class="full" for="message"
        >Anything else we should know?<!-- -->
        <span class="optional">(optional)</span
        ><textarea
          id="message"
          name="message"
          rows="4"
          maxlength="3000"
          placeholder="Tell us about your work, team size, or workspace needs."
        ></textarea>
      </label>
    </div>
    <label class="honeypot" aria-hidden="true"
      >Leave empty<input tabindex="-1" autocomplete="off" name="website"
    /></label>
    <p class="fine-print">
      We use your details to respond to this enquiry. Read our<!-- -->
      <a href="/privacy">privacy information</a>. A preferred date is a request,
      not a confirmed booking.
    </p>
    <button class="button" <?php if (!$inquiryEnabled) echo 'disabled'; ?>>
      Request a Visit / Send Enquiry<svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-arrow-up-right"
      >
        <path d="M7 7h10v10"></path>
        <path d="M7 17 17 7"></path>
      </svg>
    </button>
  </form>
  <aside class="contact-aside">
    <span class="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
    <h2>Come for the space.<br />Stay for the possibilities.</h2>
    <p>
      Have a question about a desk, a team workspace, or a meeting room? Start
      with an enquiry.
    </p>
    <div class="contact-detail">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-map-pin"
      >
        <path
          d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
        ></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      <div>
        <h3>Find us in Pune</h3>
        <p>Tejas Imperial, Bhujbal Chowk, Pune, Maharashtra – 411057</p>
      </div>
    </div>
    <div class="contact-detail">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-mail"
      >
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
      <div>
        <h3>Get in touch</h3>
        <p>
          Direct email and phone details will be added after business
          confirmation.
        </p>
      </div>
    </div>
    <div class="contact-detail">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-clock"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <div>
        <h3>Plan your visit</h3>
        <p>
          Business hours are awaiting confirmation. Please arrange your visit
          with the team in advance.
        </p>
      </div>
    </div>
  </aside>
</section>
<section class="container section">
  <div class="location-grid">
    <div>
      <span class="eyebrow">RIGHT WHERE YOU NEED TO BE</span>
      <h2>A place to work.<br />A location that works.</h2>
      <p>Make your next working day a little closer to where you want to be.</p>
      <div class="address">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-map-pin"
        >
          <path
            d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
          ></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <div>
          <strong>TS-SPACES, Pune</strong>
          <p>Tejas Imperial, Bhujbal Chowk, Pune, Maharashtra – 411057</p>
        </div>
      </div>
      <a
        href="https://www.google.com/maps/search/?api=1&amp;query=Tejas+Imperial+Bhujbal+Chowk+Pune+411057"
        target="_blank"
        rel="noreferrer"
        class="text-link"
        >Open in Google Maps
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-arrow-up-right"
        >
          <path d="M7 7h10v10"></path>
          <path d="M7 17 17 7"></path></svg
      ></a>
      <p class="fine-print">
        Area preview. Please confirm the exact entrance before visiting.
      </p>
    </div>
    <div class="map-wrap">
      <iframe
        title="Area map for Tejas Imperial, Bhujbal Chowk, Pune"
        src="https://maps.google.com/maps?q=Tejas%20Imperial%20Bhujbal%20Chowk%20Pune%20411057&amp;output=embed"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe
      ><span class="map-caption">TEJAS IMPERIAL · BHUJBAL CHOWK</span>
    </div>
  </div>
</section>
<!--$~--><template id="B:1"></template><!--/$-->
