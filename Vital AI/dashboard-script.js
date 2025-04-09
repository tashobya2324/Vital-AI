// Custom JavaScript for Vital AI Doctor's Dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  
    // Toggle sidebar on mobile
    const btnToggleSidebar = document.querySelector('.btn-toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (btnToggleSidebar) {
      btnToggleSidebar.addEventListener('click', function() {
        sidebar.classList.toggle('show');
      });
    }
  
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
      if (window.innerWidth < 992) {
        if (!sidebar.contains(event.target) && !btnToggleSidebar.contains(event.target)) {
          sidebar.classList.remove('show');
        }
      }
    });
  
    // Search functionality for present patients
    const searchPresentPatients = document.getElementById('searchPresentPatients');
    if (searchPresentPatients) {
      searchPresentPatients.addEventListener('input', function() {
        filterTable('presentPatientsTable', this.value);
      });
    }
  
    // Search functionality for patient database
    const searchPatientDatabase = document.getElementById('searchPatientDatabase');
    if (searchPatientDatabase) {
      searchPatientDatabase.addEventListener('input', function() {
        filterTable('patientDatabaseTable', this.value);
      });
    }
  
    // Function to filter table rows based on search input
    function filterTable(tableId, query) {
      const table = document.getElementById(tableId);
      if (!table) return;
      
      const rows = table.getElementsByTagName('tr');
      const lowerCaseQuery = query.toLowerCase();
      
      for (let i = 0; i < rows.length; i++) {
        const rowText = rows[i].textContent.toLowerCase();
        if (rowText.includes(lowerCaseQuery)) {
          rows[i].style.display = '';
        } else {
          rows[i].style.display = 'none';
        }
      }
    }
  
    // Add Patient Form Handling
    const addPatientForm = document.getElementById('addPatientForm');
    const savePatientBtn = document.getElementById('savePatientBtn');
    
    if (savePatientBtn) {
      savePatientBtn.addEventListener('click', function() {
        if (addPatientForm.checkValidity()) {
          // Simulate saving patient data
          showToast('Patient added successfully!', 'success');
          
          // Close modal
          const addPatientModalEl = document.getElementById('addPatientModal');
          const addPatientModal = bootstrap.Modal.getInstance(addPatientModalEl);
          addPatientModal.hide();
          
          // Reset form
          addPatientForm.reset();
        } else {
          // Trigger form validation
          addPatientForm.reportValidity();
        }
      });
    }
  
    // Prescription Form Handling
    const prescriptionForm = document.getElementById('prescriptionForm');
    const savePrescriptionBtn = document.getElementById('savePrescriptionBtn');
    
    if (savePrescriptionBtn) {
      savePrescriptionBtn.addEventListener('click', function() {
        if (prescriptionForm.checkValidity()) {
          // Check if AI review is requested
          const aiReviewCheck = document.getElementById('aiReviewCheck');
          
          if (aiReviewCheck && aiReviewCheck.checked) {
            // Simulate AI review
            showAIReviewModal();
          } else {
            // Simulate saving prescription
            showToast('Prescription saved successfully!', 'success');
            
            // Close modal
            const prescriptionModalEl = document.getElementById('prescriptionModal');
            const prescriptionModal = bootstrap.Modal.getInstance(prescriptionModalEl);
            prescriptionModal.hide();
            
            // Reset form
            prescriptionForm.reset();
            resetMedicationsList();
          }
        } else {
          // Trigger form validation
          prescriptionForm.reportValidity();
        }
      });
    }
  
    // Add Medication Button
    const addMedicationBtn = document.getElementById('addMedicationBtn');
    if (addMedicationBtn) {
      addMedicationBtn.addEventListener('click', function() {
        addMedicationItem();
      });
    }
  
    // Initialize medication list with remove functionality
    initializeMedicationsList();
  
    // AI Suggest Button
    document.addEventListener('click', function(event) {
      if (event.target && event.target.id === 'aiSuggestBtn') {
        simulateAISuggestion(event.target);
      }
    });
  
    // Set current date for prescription date
    const prescriptionDate = document.getElementById('prescriptionDate');
    if (prescriptionDate) {
      const today = new Date();
      const formattedDate = today.toISOString().substr(0, 10);
      prescriptionDate.value = formattedDate;
    }
  
    // Function to initialize medications list
    function initializeMedicationsList() {
      // Add event listeners for remove buttons
      document.querySelectorAll('.remove-medication').forEach(button => {
        button.addEventListener('click', function() {
          const medicationItem = this.closest('.medication-item');
          if (document.querySelectorAll('.medication-item').length > 1) {
            medicationItem.remove();
          } else {
            // If it's the last item, just clear the fields
            clearMedicationFields(medicationItem);
          }
        });
      });
    }
  
    // Function to add a new medication item
    function addMedicationItem() {
      const medicationsList = document.getElementById('medicationsList');
      const medicationTemplate = document.querySelector('.medication-item').cloneNode(true);
      
      // Clear the fields in the cloned template
      clearMedicationFields(medicationTemplate);
      
      // Add event listener for the remove button
      const removeButton = medicationTemplate.querySelector('.remove-medication');
      removeButton.addEventListener('click', function() {
        if (document.querySelectorAll('.medication-item').length > 1) {
          medicationTemplate.remove();
        } else {
          clearMedicationFields(medicationTemplate);
        }
      });
      
      // Add event listener for AI suggest button
      const aiSuggestBtn = medicationTemplate.querySelector('#aiSuggestBtn');
      if (aiSuggestBtn) {
        aiSuggestBtn.addEventListener('click', function() {
          simulateAISuggestion(this);
        });
      }
      
      medicationsList.appendChild(medicationTemplate);
    }
  
    // Function to clear medication fields
    function clearMedicationFields(medicationItem) {
      medicationItem.querySelector('.medication-name').value = '';
      medicationItem.querySelector('.medication-dosage').value = '';
      medicationItem.querySelector('.medication-frequency').value = '';
      medicationItem.querySelector('.medication-route').value = '';
      medicationItem.querySelector('.medication-duration').value = '';
      medicationItem.querySelector('.medication-instructions').value = '';
    }
  
    // Function to reset medications list to a single empty item
    function resetMedicationsList() {
      const medicationsList = document.getElementById('medicationsList');
      if (medicationsList) {
        // Remove all items
        medicationsList.innerHTML = '';
        
        // Create a new empty item
        const medicationTemplate = document.querySelector('.medication-item').cloneNode(true);
        clearMedicationFields(medicationTemplate);
        
        // Add event listener for the remove button
        const removeButton = medicationTemplate.querySelector('.remove-medication');
        removeButton.addEventListener('click', function() {
          clearMedicationFields(medicationTemplate);
        });
        
        medicationsList.appendChild(medicationTemplate);
      }
    }
  
    // Function to simulate AI suggestion
    function simulateAISuggestion(button) {
      const medicationItem = button.closest('.medication-item');
      const nameInput = medicationItem.querySelector('.medication-name');
      
      // Show loading state
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      button.disabled = true;
      
      // Simulate API call delay
      setTimeout(() => {
        // Get the patient's condition
        const patientSelect = document.getElementById('prescriptionPatient');
        const selectedPatient = patientSelect.options[patientSelect.selectedIndex].text;
        
        let suggestion = {};
        
        // Simulate AI suggestions based on selected patient
        if (selectedPatient.includes('John Smith')) {
          suggestion = {
            name: 'Amiodarone',
            dosage: '200mg',
            frequency: 'Twice daily',
            route: 'Oral',
            duration: '30',
            durationUnit: 'days',
            instructions: 'Take with food to minimize gastrointestinal irritation.'
          };
        } else if (selectedPatient.includes('Emily Johnson')) {
          suggestion = {
            name: 'Azithromycin',
            dosage: '500mg',
            frequency: 'Once daily',
            route: 'Oral',
            duration: '5',
            durationUnit: 'days',
            instructions: 'Take on an empty stomach 1 hour before or 2 hours after meals.'
          };
        } else if (selectedPatient.includes('Robert Chen')) {
          suggestion = {
            name: 'Morphine Sulfate',
            dosage: '10mg',
            frequency: 'Every 4 hours',
            route: 'Intravenous',
            duration: '7',
            durationUnit: 'days',
            instructions: 'Administer slowly over 4-5 minutes. Monitor respiratory status.'
          };
        } else {
          suggestion = {
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            route: 'Oral',
            duration: '30',
            durationUnit: 'days',
            instructions: 'Take at the same time each day. Monitor blood pressure regularly.'
          };
        }
        
        // Fill in the suggestion
        nameInput.value = suggestion.name;
        medicationItem.querySelector('.medication-dosage').value = suggestion.dosage;
        medicationItem.querySelector('.medication-frequency').value = suggestion.frequency;
        medicationItem.querySelector('.medication-route').value = suggestion.route;
        medicationItem.querySelector('.medication-duration').value = suggestion.duration;
        medicationItem.querySelector('.medication-duration-unit').value = suggestion.durationUnit;
        medicationItem.querySelector('.medication-instructions').value = suggestion.instructions;
        
        // Reset button
        button.innerHTML = '<i class="fas fa-robot"></i> AI Suggest';
        button.disabled = false;
        
        // Show toast
        showToast('AI suggestion applied based on patient history and condition', 'info');
      }, 1500);
    }
  
    // Function to show AI review modal
    function showAIReviewModal() {
      // Create modal element
      const modalHTML = `
        <div class="modal fade" id="aiReviewModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title">
                  <i class="fas fa-robot me-2"></i> AI Prescription Review
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="d-flex justify-content-center mb-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <p class="text-center">Analyzing prescription for potential drug interactions, appropriate dosages, and contraindications...</p>
                <div id="aiReviewResults" class="mt-4" style="display: none;">
                  <div class="alert alert-success">
                    <i class="fas fa-check-circle me-2"></i> No significant drug interactions detected.
                  </div>
  
  