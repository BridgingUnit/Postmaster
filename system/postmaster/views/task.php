<script type="text/javascript" src="<?php echo $ib_path?>"></script>
<script type="text/javascript">
	$(document).ready(function() {
	
		var IB = new InterfaceBuilder();
	
	});
</script>

<style type="text/css">
	.CodeMirror-scroll {
		min-height: <?php echo $template->height?>;
	}
</style>

<form action="<?php echo $template->action?>" method="post" class="group postmaster">
	
	<input type="hidden" name="XID" value="<?php echo $xid?>">
	
	<fieldset class="column group sidebar">
				
		<div class="container">
			<h3><a href="#help-title" class="help"><label for="title">Task Title</label> <span>(?)</span></a></h3>
			
			<input type="text" name="title" id="title" value="<?php echo form_prep($template->title) ?>" />
			
			<div id="help-title" class="help-text">
				
				<h2>Task Title</h2>

				<p>The Task Title is a value you can use to give each task you install some meaning or context. This field has no programatic purpose, and is strictly for you to use to know what is what.</p>
				
			</div>
			
		</div>

		
		<div class="container margin-top">
			<h3><a href="#help-enabled" class="help"><label for="enabled">Enabled?</label> <span>(?)</span></a></h3>
			
			<select name="enabled" id="enabled">
				<option value="1" <?php echo $template->is_enabled() ? 'selected="selected"' : ''; ?>>Enabled</option>
				<option value="0" <?php echo !$template->is_enabled() ? 'selected="selected"' : ''; ?>>Disabled</option>
			</select>
			
			<div id="help-enabled" class="help-text">
				
				<h2>Is the Task Enabled?</h2>

				<p>The Enabled property is a value you can use to prevent the task from triggering without having to change the data or delete it.</p>
				
			</div>
		</div>
		
	</fieldset>
	
	<fieldset class="column group editor">
			
		<div class="container margin-top">
		
			<h2><a href="#help-task" class="help"><label for="task">Task <span>(?)</span></label></a></h2>
							
			<select name="task" class="onchange" data-group=".hook-panel" data-default="postmaster_base_hook">
				<option value="">--</option>
			<?php foreach($template->tasks() as $task): ?>
				<option value="<?php echo $task->get_name()?>" <?php if($task->get_name() == $template->task): ?>selected="selected"<? endif; ?>><?php echo $task->get_title()?></option>
			<?php endforeach; ?>
			</select>
				
			<div class="task-settings margin-top clear">
				
				<h2>Settings</h2>		
			
				<?php foreach($template->tasks(TRUE) as $task): ?>
				
					<?php if($task->display_settings($template->settings)): ?>
						<div class="margin-top hook-panel" id="<?php echo $task->get_name()?>_panel">
							<h3><?php echo $task->get_title()?> Settings</h3>
							<?php echo $task->display_settings($template->settings); ?>
						</div>
					<?php endif; ?>
				<?php endforeach; ?>
				
			</div>

		</div>
		
		<!--	
		<div class="margin-top service clear">
		
			<h2><a href="#email_service" class="help">Email Service <span>(?)</span></a></h2>

			<div class="help-text" id="email_service">
				<h2>Email Service</h2>
				<p>This is the method used to send an email. By default, ExpressionEngine is used to send email. This can be simple and effective for some. But to reliably send emails to thousands of people, you will need to use a third-party service.
			</div>
			
			<select name="service" id="service" class="onchange" data-group=".service-panel">			
			<?php foreach($template->services() as $service): ?>
				<option value="<?php echo $service->name ?>" <?php if($template->service == $service->name): ?>selected="selected"<?php endif; ?>><?php echo $service->name ?></option>
			<?php endforeach; ?>
			</select>


			<div class="service-panels">
			
				<?php foreach($template->services() as $service): ?>
				<div class="service-panel" id="<?php echo $service->name ?>_panel">
	
					<h3><?php echo $service->name ?> Settings</h3>
	
					<?php echo $service->description ?>
	
					<?php echo $service->display_settings($template->settings, $template) ?>
	
				</div>
				<?php endforeach; ?>
				
			</div>

		</div>
		-->
		
		<input type="hidden" name="id" value="<?php echo $template->id?>" />
		<input type="hidden" name="site_id" value="<?php echo $template->site_id?>" />
		<input type="hidden" name="return" value="<?php echo $template->return?>" />

		<button type="submit" class="submit float-right"><?php echo $template->button?></button>
	
	</fieldset>
	
</form>

<script type="text/javascript">

	Postmaster.editorSettings = <?php echo $template->editor_settings?>;
	Postmaster.settings       = <?php echo json_encode($template->settings)?>;
	Postmaster.parser		  = '<?php echo $template->parser_url?>';

</script>
