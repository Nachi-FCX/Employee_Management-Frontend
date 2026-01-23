<template>
  <div class="landing">
    <BackgroundDecoration />

    <!-- Top Brand Bar -->
    <div class="top-bar">
      <div class="brand">Fincorpx</div>
      <div class="tagline">Employee Management Dashboard</div>
    </div>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-left">
        <h1>Hello Users!</h1>
        <h2>
          Introducing <span>Fincorpx Employee Management Software</span>
        </h2>
        <p>
          Simplify your HR processes and boost team productivity with our
          all-in-one employee management solution.
        </p>
        <div class="cta-buttons">
          <button class="btn-primary">Get Started</button>
          <button class="btn-secondary">Watch Demo</button>
        </div>
      </div>

      <div class="hero-right">
        <img src="/images/image-removebg-preview (7).png" alt="EMS Dashboard" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <h2>Powerful Features to Manage Your Team</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <h3>Employee Directory</h3>
          <p>Organize and manage employee records.</p>
        </div>
        <div class="feature-card">
          <h3>Attendance Tracking</h3>
          <p>Monitor employee attendance and work hours.</p>
        </div>
        <div class="feature-card">
          <h3>Leave Management</h3>
          <p>Simplify leave requests and approvals.</p>
        </div>
        <div class="feature-card">
          <h3>Performance Reviews</h3>
          <p>Conduct performance evaluations seamlessly.</p>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works">
      <h2>How It Works</h2>
      <div class="steps">
        <div class="step">
          <span>1</span>
          <div>
            <h4>Add Employees</h4>
            <p>Easily onboard new hires and maintain employee records.</p>
          </div>
        </div>
        <div class="step">
          <span>2</span>
          <div>
            <h4>Track Attendance & Leaves</h4>
            <p>Monitor employee attendance and manage leave requests.</p>
          </div>
        </div>
        <div class="step">
          <span>3</span>
          <div>
            <h4>Generate Reports</h4>
            <p>Access insightful reports for data-driven HR decisions.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <h2>What Our Clients Say</h2>
      <div class="testimonial-grid">
        <div class="testimonial-card">
          <strong>Sarah M.</strong>
          <span>HR Manager</span>
          <p>
            "Fincorpx has made managing our employees so much easier. The
            attendance tracking and leave management features are incredible."
          </p>
        </div>
        <div class="testimonial-card">
          <strong>David L.</strong>
          <span>Team Lead</span>
          <p>
            "Fincorpx has been a game changer for our team. The reporting tools
            are fantastic and have improved our decision-making."
          </p>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta">
      <h2>Get Started with Fincorpx Today!</h2>
      <p>
        Try Fincorpx for free and revolutionize your employee management
        process.
      </p>
      <div class="cta-buttons">
        <button class="btn-primary">Try It Now - It’s Free</button>
        <button class="btn-secondary">Request a Demo</button>
      </div>
    </section>
  </div>
</template>



<style scoped>
.landing {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #1f2933;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2563eb;
}

.tagline {
  color: #6b7280;
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 3rem 2rem;
  align-items: center;
}

.hero-left h1 {
  font-size: 2.25rem;
  margin-bottom: 0.5rem;
}

.hero-left h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.hero-left h2 span {
  color: #2563eb;
}

.hero-left p {
  font-size: 1.05rem;
  margin-bottom: 1.5rem;
  color: #4b5563;
}

.hero-right img {
  width: 100%;
  max-width: 520px;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.btn-primary {
  background: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.btn-secondary {
  background: transparent;
  color: #2563eb;
  border: 2px solid #2563eb;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
}

.features {
  padding: 3rem 2rem;
  background: #f9fafb;
}

.features h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.how-it-works {
  padding: 3rem 2rem;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step span {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: #2563eb;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
}

.testimonials {
  padding: 3rem 2rem;
  background: #f9fafb;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.testimonial-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.testimonial-card strong {
  display: block;
  margin-bottom: 0.25rem;
}

.testimonial-card span {
  display: block;
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

.final-cta {
  padding: 3rem 2rem;
  text-align: center;
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .cta-buttons {
    justify-content: center;
  }
}
</style>